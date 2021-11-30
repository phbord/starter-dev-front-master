import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import TasksScreen from './src/screens/Tasks';

const App = ({children, title}) => {
  return (
      <SafeAreaView style={{flex: 1}}>
        <TasksScreen />
      </SafeAreaView>
  )
};

const styles = StyleSheet.create({
});

export default App;
