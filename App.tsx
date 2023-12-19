/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import Main from './src/main';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={'white'} />
      <Main />
    </SafeAreaView>
  );
}

export default App;
