import React, {createContext, useState} from 'react';
import {View} from 'react-native';
// import CalendarScreen from './components/calendarScreen';
import TodoList from './components/todoList';
import Header from './components/header';
import AddTodo from './components/addTodo';
import dummy from './db/data.json';

export const MainContext = createContext();

const Main = () => {
  const [data, setData] = useState(dummy);

  const [edit, setEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  const [selectedDay, setSelectedDay] = useState('');

  const handleSelectedDay = day => {
    setSelectedDay(day.dateString);
  };
  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <View className="w-full h-full space-y-5 bg-white">
      <MainContext.Provider value={{data, selectedDay}}>
        <Header
          onPressEdit={handleEdit}
          edit={edit}
          handleSelectedDay={handleSelectedDay}
        />
        {/* <CalendarScreen /> */}
        {/* <Test /> */}
        <AddTodo visible={modalAdd} onPressCancle={setModalAdd} />
        <TodoList
          edit={edit}
          onPressAdd={setModalAdd}
          selectedDay={selectedDay}
        />
      </MainContext.Provider>
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
