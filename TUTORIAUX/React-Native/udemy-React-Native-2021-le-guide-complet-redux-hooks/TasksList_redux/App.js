import React from 'react';
import {
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import TasksScreen from './src/screens/Tasks';

const App = ({children, title}) => {

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex:1}} >
        <TasksScreen />
      </SafeAreaView>
    </Provider>
  )
};

const styles = StyleSheet.create({
  
});

export default App;
