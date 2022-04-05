import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Image,
  TargetedEvent,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import TodoItem from "../My-todo/components/TodoItem";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import { openDatabase, SQLResultSet, SQLTransaction } from "expo-sqlite";
let db = openDatabase("db.todosapp");

interface todoitem {
  text: string;
  completed: boolean;
}

const App = () => {
  const [todo, setTodo] = React.useState("");
  const [up, onupdate] = React.useState("");
  // const [listTodo , setList]=useState<todoitem[]>([]);
  const [listTodo, setList] = useState([]) as any;

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists  items (id integer primary key not null, done int, value text);"
      );
    });
    giveTodo()
  }, [up]);

  const addtodo = async (value: string) => {
    if (todo === null || todo.length == 0) {
      alert("no todo added  please add todo");
      return false;
    }
    db.transaction(async (tx) => {
      tx.executeSql(
        "INSERT into items (value,done) values (?,0)",
        [value],
        (_, { rows }) => {
          giveTodo();
          onupdate("");
          setTodo("")
        }
      );
    });
  };

  const removeTodo = async (idx: number) => {
    db.transaction(async (tx) => {
      tx.executeSql("DELETE FROM items WHERE id=?", [idx], (_, { rows }) => {
        giveTodo();
        // onupdate("");
      });
      tx.executeSql("select * from items", [], (_, { rows }) => {
        giveTodo();
        // onupdate("");
      });
    });
  };

  const giveTodo = () => {
    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM items", [], (_, { rows }) => {
        setList(rows._array);
      });
    });
  };

  const upToData = async (idx: number) => {
    db.transaction(async (txn) => {
      txn.executeSql(
        "UPDATE items SET done = 1 WHERE id=?",
        [idx]
      );
      txn.executeSql("select * from items where id=?", [idx], (_, { rows }) => {
        giveTodo();
        onupdate("");
      });
    });
  };

  // const handleAddtodo =() => {

  //  Keyboard.dismiss();
  //   setList([...listTodo , todo]);
  //   setTodo("")

  //       }

  //      const deleteTodo =(index: number) =>{
  //        let todoCopy=[...listTodo];
  //        todoCopy.splice(index,1);
  //       setList(todoCopy);
  //     }
  //    const error =()=>{
  //      if (todo === null || todo.length == 0) {
  //     return console.log("your todo is empty")
  //   }
  // }
  //  const removeItem = (idx:number) => {
  //     return todoCopy.setList({todo: [...listTodo].splice(idx, 1)})
  //   }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../My-todo/assets/cover.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}> My Todo List </Text>

        <TextInput
          style={styles.input}
          placeholder="  Enter your todo item  "
          value={todo}
          onChangeText={(text) => setTodo(text)}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => addtodo(todo)}>
          <View style={styles.addButton}>
            <Text> + </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.items}>
          {listTodo.map((item: any, idx: number) => (
            <View key={item.id}>

              <TouchableOpacity 
                onPress={() => {
                  upToData(item.id);
                  
                }}
               
              >
                 
                {/* <TodoItem  props ={ item.value, item.done, item.id} /> */}

                <View style={styles.item}>
                  <View style={styles.itemleft}>

                    <Text style={styles.itemText}> {item.value}</Text>
                    
                    </View>
                    
                </View>
               
              </TouchableOpacity>
              <View style={styles.containerl}>
              <TouchableOpacity onPress={()=>removeTodo(item.id)}>
                  <Image style={{width:15, height:15 , marginLeft:270}} source={require('../My-todo/assets/delete.png')}/>
                  </TouchableOpacity>

              {item.done==1?
                    <Image style={{width:15, height:15 , marginLeft:20  }} source={require('../My-todo/assets/check.png')}/>
                     :<View></View>

                  }
                  
                  
                  </View>

             </View>
          ))}
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-between'
  },

  text: {
    color: "#214c33",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 180,
    fontStyle: "italic",
  },
  bar: {
    marginHorizontal: 8,
    borderColor: "green",
  },
  image: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 250,
    elevation: 20,
    backgroundColor: "#214c33",
  },

  items: {
    marginTop: 30,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 200,
    borderRadius: 40,
    borderColor: "#214c33",
    backgroundColor: "transparent",
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: "#214c33",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginLeft: 330,
    paddingVertical: 3,
    paddingHorizontal: 3,
    
  },
  containerl: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "center",
    position:'absolute',
    top:35
  },

  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:15 ,
    width:"70%",
    margin:5
  },

  itemleft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent:"space-between"
  },
  itemText: {
    maxWidth: "100%",
  },
  taskContainer: {
    backgroundColor: "#3E3364",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  task: {
    color: "#fff",
    width: "70%",
    fontSize: 16,
  },
  delete: {
    marginLeft: 10,
  },
});
type todos = {
  value: string;
  done: number;
  id: number;
};
