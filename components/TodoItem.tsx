import React from "react";
import {View , Text, StyleSheet, TouchableOpacity} from 'react-native';

//useble component for the item that i put in the list

const TodoItem =(props:todos)=>{
  
   return (

       <View style={styles.item}>
         <View style={styles.itemleft}>
       <Text style={styles.itemText}> {props.value}</Text>
       {
         console.log(props.value)
       }
       </View>
       
       </View>
   )
}

type todos = {
  value: string;
  done:number;
  id:number;
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 20,

    },
     
        item:{
          backgroundColor:'white',
          padding :15,
          borderRadius :80,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          marginBottom:20,
          
        },

        itemleft:{
           flexDirection:'row',
           alignItems:"center",
           flexWrap:'wrap'
        },
        itemText:{
          maxWidth:'100%',

        },
        taskContainer: {
          backgroundColor: '#3E3364',
          borderRadius: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 5,
          minHeight: 50,
      },
      task: {
          color: '#fff',
          width: '90%',
          fontSize: 16,
      },
      delete: {
          marginLeft: 10,
      },
  });
  export default TodoItem;