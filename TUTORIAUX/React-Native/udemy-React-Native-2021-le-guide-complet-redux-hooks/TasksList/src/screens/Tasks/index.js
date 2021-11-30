import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import Header from '../../components/Header';
import FloatingBtn from '../../components/FloatingBtn';
import Counter from '../../components/Counter';
import TaskForm from './TaskForm';
import TaskTile from './TaskTile';

export default function TasksScreen() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const renderItem = ({item}) => {
    return <TaskTile task={item} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask}/>
  };

  const onAddTask = (title) => {
    setTasks([...tasks, {
      id: Date.now(),
      title,
      isCompleted: false
    }]);
  };

  const onDeleteTask = (id) => {
    let newTasks = [];

    tasks.forEach(t => {
      if (t.id !== id) {
        newTasks.push(t);
        return;
      }
    });

    setTasks(newTasks);
  };

  const onUpdateTask = (id) => {
    let newTasks = [];

    tasks.forEach(t => {
      if (t.id !== id) {
        newTasks.push(t);
        return;
      }

      newTasks.push({
        id,
        title: t.title,
        isCompleted: !t.isCompleted
      });
    });

    setTasks(newTasks);
  };

  const _formForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <FlatList ListHeaderComponent={
                <>
                  <Header/>
                  {isFormVisible && <TaskForm onAddTask={onAddTask}/>}
                  <View style="styles.containerCounters">
                    <Counter nb={tasks.length} 
                            title="Tâches crées"/>
                    <Counter nb={tasks.filter(t => t.isCompleted === true).length} 
                            title="Tâches effectuées"/>
                  </View>
                </>} 
                contentContainerStyle={{ flexGrow: 1 }} 
                data={tasks} 
                keyExtractor={(item, index) => index.toString()} 
                renderItem={renderItem}/>
      <FloatingBtn toogle={_formForm} isOpen={isFormVisible} />
    </>
  )
}

const styles = StyleSheet.create({
  containerCounters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 20
  }
});
