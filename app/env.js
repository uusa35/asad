import {ENV, PORT} from 'react-native-dotenv';

if (ENV === 'local') {
  console.log('the env >>>>> ', ENV);
  module.exports = {
    // appUrlIos: `http://192.168.43.102:8000/`,
    // appUrlIos: `http://192.168.1.107:8000/`,
    // appUrlIos: `http://192.168.43.255:8000/`,
    appUrlIos: `http://asadgroup.test/`,
    appUrlAndroid: 'http://10.0.2.2:8000/',
    port: PORT
  };
} else if (ENV === 'production') {
  module.exports = {
    appUrlIos: 'http://app.asadgroup.com/',
    appUrlAndroid: 'http://app.asadgroup.com/',
    port: PORT
  };
}
