import {ENV, PORT} from 'react-native-dotenv';

console.log('the env -> ', ENV);
if (ENV === 'local') {
  module.exports = {
    graphUrlAndroid: `http://10.0.3.2:${PORT}/graphql`,
    //graphUrlAndroid: `http://10.0.3.2:${port}/graphql`,
    // appUrlIos: `http://192.168.43.102:8000/`,
    // appUrlIos: `http://192.168.1.107:8000/`,
    // appUrlIos: `http://192.168.100.3:8000/`,
    appUrlIos: `http://asadgroup.test/`,
    appUrlAndroid: 'https://10.0.3.2:8000/',
    port: PORT
  };
} else {
  module.exports = {
    appUrlIos: 'http://asadgroup.com/',
    appUrlAndroid: 'http://asadgroup.com/',
    port: PORT
  };
}
