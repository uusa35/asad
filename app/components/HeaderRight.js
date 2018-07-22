/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {APP_ACTIONS} from './../redux/actions';
import {Icon} from 'react-native-elements';
import {width, colors} from './../constants';

class HeaderRight extends Component {
  constructor(props) {
    super(props);
  }

  changeLang() {
    newLang = this.props.lang === 'ar' ? 'en' : 'ar';
    this.props.actions.changeLang(newLang);
  }

  render() {
    return (
      <View style={styles.headerTopBarSectionB}>
        {this.props.icon ? (
          <Icon
            name="language"
            onPress={() => this.changeLang()}
            color={colors.themeBg}
            underlayColor="transparent"
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          />
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(APP_ACTIONS, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderRight);

const styles = StyleSheet.create({
  headerTopBarSectionB: {
    width: width / 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5
  }
});
