import React, {useState} from 'react';
import {View} from 'react-native';
// import CalendarScreen from './components/calendarScreen';
import TodoList from './components/todoList';
import Header from './components/header';
import AddTodo from './components/addTodo';

const Main = () => {
  const [edit, setEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <View className="w-full h-full space-y-5">
      <Header onPressEdit={handleEdit} edit={edit} />
      {/* <CalendarScreen /> */}
      {/* <Test /> */}
      <AddTodo visible={modalAdd} onPressCancle={setModalAdd} />
      <TodoList edit={edit} onPressAdd={setModalAdd} />
    </View>
  );
};

// const Test = () => {
//   const scrollViewRef = useRef<ScrollView>(null);
//   const scrollToPosition = () => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollToEnd({animated: true});
//     }
//   };

//   return (
//     <ScrollView
//       horizontal
//       contentOffset={{x: 100, y: 0}}
//       onScrollEndDrag={scrollToPosition}
//       ref={scrollViewRef}>
//       <Text className="text-2xl">
//         처음asdasdddasdasdasdasasdasdasdasdasdasdas마지막
//       </Text>
//     </ScrollView>
//   );
// };

export default Main;
