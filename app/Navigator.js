import React from 'react';
import {connect} from 'react-redux';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import I18n from './I18n';
import SideMenu from './components/SideMenu';
import {getHeader, getTabTitle} from './helpers';
import HeaderLeft from './components/HeaderLeft';
import HeaderCustom from './components/HeaderCustom';
import HomeSliderScreen from './screens/HomeSlider/HomeSliderScreen';
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import RegisterAsScreen from './screens/Register/RegisterAsScreen';
import ForgetPasswordScreen from './screens/ForgetPassword/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPassword/ResetPasswordScreen';
import {colors, text} from './constants';

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const headerStyle = {
  headerStyle: {
    backgroundColor: colors.main,
    borderWidth: 1,
    borderColor: 'grey'
  },
  drawerLockMode: 'locked-closed'
};

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('home')),
        headerLeft: <HeaderLeft navigation={navigation} />
      })
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('login'))
      })
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: ({navigation}) => ({
        isModal: true,
        headerTitle: getHeader(I18n.t('register').toLocaleUpperCase())
      })
    },
    RegisterAs: {
      screen: RegisterAsScreen,
      navigationOptions: ({navigation}) => ({
        isModal: true,
        headerTitle: getHeader(I18n.t('register_as').toLocaleUpperCase())
      })
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('register'))
      })
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('forget_password'))
      })
    }
  },
  {
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: headerStyle
  }
);

const RootStack = createStackNavigator(
  {
    HomeSlider: {
      screen: HomeSliderScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: getHeader(I18n.t('home_slider'))
      })
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

const TabsStack = createBottomTabNavigator(
  {
    RootStack: {
      screen: RootStack
    },
    HomeStack: {
      screen: HomeStack
    }
  },
  {
    //   tabBarPosition: 'bottom',
    //   tabBarOptions: {
    //     showIcon: true,
    //     scrollEnabled: false,
    //     allowFontScaling: true,
    //     activeTintColor: 'pink',
    //     activeBackgroundColor: '#bfbfbf',
    //     labelStyle: {
    //       fontSize: 10,
    //       fontFamily: 'cairo',
    //       fontWeight: 'bold',
    //       color: 'white'
    //     },
    //     style: {
    //       backgroundColor: '#f2f2f2'
    //     }
    //   },
    navigationOptions: {
      tabBarVisible: false
    },
    initialRouteName: 'RootStack',
    order: ['RootStack', 'HomeStack']
  }
);

const RootNavigator = createDrawerNavigator(
  {
    Tabs: {
      screen: TabsStack
    }
  },
  {
    contentComponent: ({navigation}) => <SideMenu navigation={navigation} />
  }
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export {RootNavigator, AppNavigator, navMiddleware};
