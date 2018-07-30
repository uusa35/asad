import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
import {map} from 'lodash';
import {bindActionCreators} from 'redux';
import {getProject} from '../../redux/actions';
import {connect} from 'react-redux';
import {colors, icons} from '../../constants';
import I18n, {isRTL} from '../../I18n';
import {Input, Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

class ProjectIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { search : ''}
  }

  _goToProject = id => {
    this.props.actions.getProject(id);
  };
  render() {
    const {projects} = this.props;
    return (
      <View style={{margin: 5, flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <Input
            onChangeText={e => this.setState({ search : e})}
            placeholder={I18n.t('search').toUpperCase()}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputTextStyle}
            rightIconContainerStyle={styles.rightIconStyle}
            keyboardType="default"
            rightIcon={
              <FastImage source={icons.user} style={[styles.iconTabBar]} />
            }
          />
        </View>
        {map(projects, p => {
          return (
            <ProjectPanelWidget
              project={p}
              key={p.id}
              handleCLick={this._goToProject}
            />
          );
        })}
      </View>
    );
  }
}

ProjectIndexScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProject: bindActionCreators(getProject, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectIndexScreen);

export const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: 'white',

    minHeight: 50,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.2
  },
  inputTextStyle: {
    fontFamily: 'cairo',
    fontSize: 15,
    textAlign: isRTL ? 'right' : 'left'
  },
  rightIconStyle: {
    backgroundColor: colors.main,
    width: 50,
    position: 'relative',
    right: 0,
    height: 50
  },
  iconTabBar: {
    width: 40,
    height: 40
  }
});
