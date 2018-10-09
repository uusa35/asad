import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal, StatusBar} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {disableMessage} from './../redux/actions';
import {width, text} from './../constants';

class AlertMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {color: null, visible: false};
  }

  hideAlert = () => {
    if (this.state.visible) {
      StatusBar.setHidden(false);
      this.props.actions.disableMessage();
      clearTimeout(this._showAlert);
    }
  };

  componentDidMount() {
    const {message} = this.props;
    this.setState({visible: message.visible, color: message.color});
    if (message.visible) {
      StatusBar.setHidden(true);
      this._showAlert = setTimeout(this.hideAlert, 3000);
    }
  }

  render() {
    const {message} = this.props;
    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          visible={this.state.visible}
          animationType={'fade'}
          onRequestClose={() => console.log('closing')}>
          <View
            style={[
              styles.modalContainer,
              {backgroundColor: this.state.color}
            ]}>
            <View style={styles.titleContainer}>
              <Icon
                name={message.icon}
                type="font-awesome"
                size={60}
                color="white"
              />
              <Text style={styles.title}>{message.title}</Text>
            </View>
            <Divider />
            <Text style={styles.content}>{message.content}</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      disableMessage: bindActionCreators(disableMessage, dispatch)
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertMessage);

styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: text.large,
    fontFamily: text.font,
    textAlign: 'left',
    flex: 0.8
  },
  content: {
    color: 'white',
    fontSize: text.medium,
    fontFamily: text.font,
    textAlign: 'left',
    paddingLeft: 3
  },
  titleContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: width
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: width
  },
  modalContainer: {
    height: 100,
    width: width,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'aqua',
    marginTop: 0
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});
