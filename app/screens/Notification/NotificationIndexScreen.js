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
import {isRTL} from '../../I18n';
import {bindActionCreators} from 'redux';
import {refetchProjects} from '../../redux/actions';
import connect from 'react-redux/es/connect/connect';
import {Icon} from 'react-native-elements';

class NotificationIndexScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {refreshing: false};
  }

  _onRefresh = () => {
    return this.props.actions.refetchProjects();
  };

  _renderNotification(n) {
    if (!validate.isEmpty(n)) {
      return (
        <TouchableOpacity
          key={n.id}
          style={{margin: 5}}
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
                <Text style={[styles.elementText, {fontSize: 19}]}>
                  {n.title.substring(0, 25)}
                </Text>
                <View style={styles.elementTextWrapper}>
                  <Icon name="clock" type="octicon" size={10} />
                  <Text style={styles.textCreatedAt}>{n.created_at}</Text>
                </View>
              </View>
              <Icon
                name={isRTL ? 'chevron-left' : 'chevron-right'}
                type="entypo"
                size={30}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const {projects} = this.props;
    return (
      <View style={styles.wrapper}>
        <FlatList
          containtContainerStyle={styles.flatListContainer}
          data={projects}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderItem={({item}) => {
            return !validate.isEmpty(item.notifications)
              ? item.notifications.map(n => this._renderNotification(n))
              : null;
          }}
          ListFooterComponent={() => <View style={{marginTop: 120}} />}
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
    backgroundColor: 'white',
    height: height
  },
  elementIcon: {
    width: 40,
    height: 40,
    margin: 5,
    marginRight: 15
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
  textCreatedAt: {
    fontSize: 12,
    paddingBottom: 3,
    paddingLeft: 5,
    fontFamily: 'cairo'
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
