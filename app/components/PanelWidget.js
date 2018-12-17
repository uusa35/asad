import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import I18n from './../I18n';

export default class PanelWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {lines: 1};
  }

  _toggleLines = () => {
    const lines = this.state.lines > 1 ? 1 : 10;
    this.setState({lines});
  };

  render() {
    const {title, content} = this.props;
    return (
      <View style={styles.panelWrapper}>
        <View style={styles.panelTitleWrapper}>
          <Text style={styles.panelTitle}>{title}</Text>
        </View>
        <View style={styles.panelContentWrapper}>
          <Text numberOfLines={this.state.lines} style={styles.panelContent}>
            {content}
          </Text>
          <TouchableOpacity onPress={() => this._toggleLines()}>
            <Text style={[styles.panelContent, {textAlign: 'right'}]}>
              {I18n.t('read_more')}
            </Text>
          </TouchableOpacity>
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
  }
});
