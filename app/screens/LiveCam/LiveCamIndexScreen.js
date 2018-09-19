import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import NotAvailableElement from '../../components/NotAvailableElement';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import Communications from 'react-native-communications';

export default class LiveCamIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {project: {}, navigation: {}, moduleName: ''};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      project: navigation.state.params.project,
      moduleName: navigation.state.params.moduleName,
      navigation
    };
  }
  render() {
    const {navigation, project, moduleName} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {validate.isEmpty(project.ip_cam_url) ? (
            <NotAvailableElement routeName={moduleName} />
          ) : (
            <View style={{flex: 1, margin: 10}}>
              <Button
                onPress={() => Communications.web(project.ip_cam_url)}
                raised
                icon={{name: 'camera', type: 'font-awesome', color: 'white'}}
                title={I18n.t('livecam')}
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

LiveCamIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
