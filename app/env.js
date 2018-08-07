import {ENV, PORT} from 'react-native-dotenv';

console.log('the env --> ', ENV);
if (ENV === 'local') {
  module.exports = {
    // appUrlIos: `http://192.168.43.102:8000/`,
    // appUrlIos: `http://192.168.1.107:8000/`,
    // appUrlIos: `http://192.168.100.3:8000/`,
    appUrlIos: `http://asadgroup.test/`,
    appUrlAndroid: 'http://10.0.2.2:8000/',
    port: PORT
  };
} else {
  module.exports = {
    appUrlIos: 'http://asadgroup.com/',
    appUrlAndroid: 'http://asadgroup.com/',
    port: PORT
  };
}
