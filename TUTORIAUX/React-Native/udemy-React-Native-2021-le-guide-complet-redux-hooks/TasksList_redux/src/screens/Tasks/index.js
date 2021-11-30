import React, { useState } from 'react'
import { FlatList, View, StyleSheet } from "react-native"
import { useSelector, useDispatch } from 'react-redux'

import { getTasks } from '../../redux/selectors'
import { toggleTask, deleteTask } from '../../redux/actions'
import TaskForm  from './TaskForm'
import TaskTile from "./TaskTile"
import Header from "../../components/Header"
import FloatingBtn from "../../components/FloatingBtn"
import Counter from "../../components/Counter"

export default function TasksScreen() {
    // Liste de taches 
    // State pour garder en mémoire les taches
    const [ isFormVisible, setIsFormVisible] = useState(false)

    const tasks = useSelector(getTasks)
    const dispatch = useDispatch()
    console.log("ALL TASKS", tasks)

    // item =  {title: "Hello world!", isCompleted: false}
    const renderItem = ({item}) => {
        return <TaskTile task={item} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
    }

    const onDeleteTask = (id) => {
        dispatch(deleteTask(id))
    } 

    const onUpdateTask = (id) => {
        dispatch(toggleTask(id))
    }

    const _toggleForm = () => {
        setIsFormVisible(!isFormVisible)
    }

    // 2x TasksCounter => props nb & title 
    // TasksList => return FlatList => TaskTile

    // Ajouter un boutton flottant => style absolute
    // callback => rendu cond. TaskForm
  return (
      <>
    <FlatList 
        ListHeaderComponent={
        <>
            <Header />
            {isFormVisible && <TaskForm/>}
            <View style={styles.containerCounters}>
                <Counter nb={tasks.length} title="Tâches crées"/>
                <Counter nb={tasks.filter(t => t.isCompleted === true).length} title="Tâches effectuées" />
            </View>
        </>}        
        contentContainerStyle={{ flexGrow:1,}}
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}/>
        <FloatingBtn toggle={_toggleForm} isOpen={isFormVisible}/>
    </>
  );
}

const styles = StyleSheet.create({
    containerCounters: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10,
        paddingHorizontal:20
    }
})