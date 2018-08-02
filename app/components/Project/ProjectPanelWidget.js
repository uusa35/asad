import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {images, width} from '../../constants';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-elements';
import I18n from './../../I18n';
import PropTypes from 'prop-types';

export default class ProjectPanelWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {project, handleClick} = this.props;
    return (
      <View key={project.id} style={styles.projectPanelWrapper}>
        <FastImage source={images.bg} style={styles.imgBg} />
        <TouchableHighlight
          onPress={handleClick}
          kye={project.id}
          underlayColor="transparent"
          activeOpacity={0.5}
          style={styles.panelMainBtn}>
          <View style={styles.panelMainBtnWrapper}>
            <FastImage
              source={{uri: project.image}}
              style={styles.projectPanelImage}
            />
            <View style={styles.panelInternalWrapper}>
              <Divider style={{backgroundColor: 'black', height: 1}} />
              <Text
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  fontWeight: 'bold',
                  fontSize: 20
                }}>
                {project.name.toUpperCase()}
              </Text>
              <Divider style={{backgroundColor: 'black', height: 1}} />
              <Text
                style={{
                  flexWrap: 'wrap',
                  padding: 10,
                  fontSize: 13
                }}>
                {project.description.substring(0, 100)}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <Divider style={{backgroundColor: 'black', height: 1}} />
        <View style={{flex: 1, padding: 10}}>
          <View style={styles.titleInfoWrapper}>
            <Text style={styles.titleInfo}>
              {I18n.t('project_start_date')} :{' '}
            </Text>
            <Text style={styles.titleInfoElement}>{project.start_date}</Text>
          </View>
          <View style={styles.titleInfoWrapper}>
            <Text style={styles.titleInfo}>
              {I18n.t('project_end_date')} :{' '}
            </Text>
            <Text style={styles.titleInfoElement}>{project.end_date}</Text>
          </View>
          <View style={styles.titleInfoWrapper}>
            <Text style={styles.titleInfo}>{I18n.t('reference_id')} : </Text>
            <Text style={styles.titleInfoElement}>{project.reference_id}</Text>
          </View>
          <View style={styles.titleInfoWrapper}>
            <Text style={styles.titleInfo}>{I18n.t('caption')} : </Text>
            <Text style={styles.titleInfoElement}>
              {project.caption.substring(0, 100)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

ProjectPanelWidget.propTypes = {
  project: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  projectPanelWrapper: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'darkgrey',
    marginBottom: 5,
    padding: 10,
    height: 350
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width - 10,
    height: 350,
    opacity: 0.2
  },
  projectPanelImage: {
    width: 90,
    height: 90,
    margin: 0,
    flexWrap: 'wrap'
  },
  panelMainBtn: {
    backgroundColor: 'transparent',
    padding: 5
  },
  panelMainBtnWrapper: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  panelInternalWrapper: {
    flexShrink: 1,
    marginLeft: 10
  },
  titleInfoWrapper: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  titleInfoElement: {
    width: 150,
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'left'
  },
  titleInfo: {
    width: 150,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left'
  }
});
