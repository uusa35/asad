import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import Communications from 'react-native-communications';
import {links} from './../../constants';

export default class ContactDetailsWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {settings} = this.props;
    return (
      <View style={styles.panelWrapper}>
        <View style={styles.panelTitleWrapper}>
          <Text style={styles.panelTitle}>{I18n.t('contact_details')}</Text>
        </View>
        <View style={styles.panelContentWrapper}>
          <View style={styles.panelContentRowWrapper}>
            <Text style={styles.panelContentTitle}>{I18n.t('address')} : </Text>
            <Text style={styles.panelContent}>{settings.address}</Text>
          </View>
          <View style={styles.panelContentRowWrapper}>
            <Text style={styles.panelContentTitle}>{I18n.t('fax')} : </Text>
            <Text style={styles.panelContent}>{settings.fax}</Text>
          </View>
          <View style={[styles.panelContentRowWrapper, {alignItems: 'center'}]}>
            <Text style={styles.panelContentTitle}>{I18n.t('phone')} : </Text>
            <Button
              title={settings.phone}
              buttonStyle={{backgroundColor: 'transparent'}}
              titleStyle={{color: 'black', fontFamily: 'cairo'}}
              onPress={() => Communications.phonecall(settings.phone, true)}
            />
          </View>
          <View style={[styles.panelContentRowWrapper, {alignItems: 'center'}]}>
            <Text style={styles.panelContentTitle}>{I18n.t('email')} : </Text>
            <Button
              title={settings.email}
              buttonStyle={{backgroundColor: 'transparent'}}
              titleStyle={{color: 'black', fontFamily: 'cairo'}}
              onPress={() =>
                Communications.email(
                  [settings.email],
                  null,
                  null,
                  I18n.t('email'),
                  ''
                )
              }
            />
          </View>
          <View style={[styles.panelContentRowWrapper, {alignItems: 'center'}]}>
            <Text style={styles.panelContentTitle}>
              {I18n.t('whatsapp')} :{' '}
            </Text>
            <Button
              title={settings.whatsapp}
              buttonStyle={{backgroundColor: 'transparent'}}
              titleStyle={{color: 'black', fontFamily: 'cairo'}}
              onPress={() =>
                Communications.web(`${links.whatsapp}${settings.whatsapp}`)
              }
            />
          </View>
          <View style={[styles.panelContentRowWrapper, {alignItems: 'center'}]}>
            <Text style={styles.panelContentTitle}>{I18n.t('website')} : </Text>
            <Button
              title={settings.site_url}
              buttonStyle={{backgroundColor: 'transparent'}}
              titleStyle={{color: 'black', fontFamily: 'cairo'}}
              onPress={() => Communications.web(settings.site_url)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelWrapper: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'darkgrey',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.3
  },
  panelTitleWrapper: {
    backgroundColor: '#474747'
  },
  panelTitle: {
    paddingLeft: 15,
    padding: 5,
    fontSize: 18,
    color: 'white',
    fontFamily: 'cairo',
    textAlign: 'left'
  },
  panelContentWrapper: {
    padding: 15,
    backgroundColor: 'white'
  },
  panelContent: {
    fontFamily: 'cairo',
    fontSize: 15,
    textAlign: 'left'
  },
  panelContentTitle: {
    fontFamily: 'cairo',
    fontSize: 15,
    textAlign: 'left',
    minWidth: 70
  },
  panelContentRowWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
});
