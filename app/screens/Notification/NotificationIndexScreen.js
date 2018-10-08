import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  FlatList
} from 'react-native';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {height, icons} from '../../constants';
import MainBtnElement from '../../components/MainBtnElement';
import I18n, {isRTL} from '../../I18n';

('../../I18n');
import {bindActionCreators} from 'redux';
import {refetchProjects} from '../../redux/actions';
import connect from 'react-redux/es/connect/connect';
import {Icon} from 'react-native-elements';

class NotificationIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {navigation: {}, projects: [], refreshing: false};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation, projects} = nextProps;
    return {
      projects,
      navigation
    };
  }

  _onRefresh = () => {
    return this.props.actions.refetchProjects();
  };

  _renderNotification(n) {
    return (
      <TouchableOpacity
        key={n.id}
        style={{borderWidth: 1, borderColor: 'grey', margin: 5}}
        onPress={() =>
          this.props.navigation.navigate('AppPDFViewer', {
            title: n.title,
            pdfLink: n.path
          })
        }>
        <View style={{padding: 10}}>
          <View style={styles.iconWrapper}>
            <FastImage
              style={styles.elementIcon}
              source={icons[n.type]}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={{flex: 1}}>
              <Text style={[styles.elementText, {fontSize: 20}]}>
                {n.title}
              </Text>
              <View style={styles.elementTextWrapper}>
                <Icon name="clock" type="octicon" size={10} />
                <Text style={styles.elementText}>{n.created_at}</Text>
              </View>
            </View>
            <Icon
              name={isRTL ? 'chevron-left' : 'chevron-right'}
              type="octicon"
              size={40}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {projects, navigation, refreshing} = this.state;
    return (
      <View style={styles.wrapper}>
        <FlatList
          containtContainerStyle={styles.flatListContainer}
          data={projects}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderItem={({item}) => {
            return item.notifications.map(n => this._renderNotification(n));
          }}
        />
      </View>
    );
  }
}

NotificationIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      refetchProjects: bindActionCreators(refetchProjects, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationIndexScreen);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white'
  },
  elementIcon: {
    width: 55,
    height: 55,
    margin: 5,
    marginRight: 10
  },
  elementTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  elementText: {
    textAlign: 'left',
    fontFamily: 'cairo',
    paddingRight: 10,
    paddingLeft: 10
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-around',
    alignItems: 'center'
  },
  flatListContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
