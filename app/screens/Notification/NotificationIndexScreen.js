import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {icons, width} from '../../constants';

export default class NotificationIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {navigation: {}, projects: []};
  }

  static getDerivedStateFromProps(nextProps) {
    const {navigation} = nextProps;
    return {
      projects: navigation.state.params.projects,
      navigation
    };
  }

  render() {
    const {projects, navigation} = this.state;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        {projects.map(
          p =>
            !validate.isEmpty(p.notifications)
              ? p.notifications.map(n => (
                  <TouchableOpacity
                    key={n.id}
                    style={{borderWidth: 1, borderColor: 'grey', margin: 5}}
                    onPress={() =>
                      navigation.navigate('AppPDFViewer', {
                        title: n.name,
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
                        <Text style={styles.elementText}>{n.title}</Text>
                      </View>
                      <View style={styles.elementTextWrapper}>
                        <Text style={styles.elementText}>{n.created_at}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              : null
        )}
      </ScrollView>
    );
  }
}

NotificationIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  elementIcon: {
    width: 30,
    height: 30,
    margin: 10
  },
  elementTextWrapper: {},
  iconWrapper: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
