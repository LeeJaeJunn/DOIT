import React, {createContext, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
// import CalendarScreen from './components/calendarScreen';
import TodoList from './components/todoList';
import Header from './components/header';
import AddTodo from './components/addTodo';
import dummy from './db/data.json';

export const MainContext = createContext();

const Main = () => {
  // 전체 데이터
  const [data, setData] = useState(dummy);

  // 편집, 메모추가 버튼
  const [edit, setEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  // 달력 Marked 데이터
  const [markedData, setMarkedData] = useState({});
  //달력 선택한 날짜
  const [selectedDay, setSelectedDay] = useState('2023-12-31');
  // 최종 Marked데이터 + selected데이터
  const [calendarData, setCalendarData] = useState({});
  //쳇 렌더링 확인
  const isMounted = useRef(false);

  const handleSelectedDay = day => {
    setSelectedDay(day.dateString);
  };
  const handleEdit = () => {
    setEdit(!edit);
  };

  // 데이터를 markedData로 변경(todos 삭제, marked 추가)
  useEffect(() => {
    const obj = {
      days: Object.fromEntries(
        Object.keys(dummy.days).map(items => [items, {marked: true}]),
      ),
    };
    setMarkedData(obj.days);
    const aaa = {[selectedDay]: {selected: true}};
    setCalendarData({...obj.days, ...aaa});
  }, [data]);

  // calendarData 생성
  useEffect(() => {
    if (isMounted.current) {
      const obj = {[selectedDay]: {selected: true}};
      setCalendarData({...markedData, ...obj});
    } else {
      isMounted.current = true;
    }
  }, [selectedDay, markedData]);

  return (
    <View className="w-full h-full space-y-5 bg-white">
      <MainContext.Provider
        value={{
          data,
          selectedDay,
          markedData,
          handleSelectedDay,
          calendarData,
        }}>
        <Header onPressEdit={handleEdit} edit={edit} />
        {/* <CalendarScreen /> */}
        {/* <Test /> */}
        <AddTodo visible={modalAdd} onPressCancle={setModalAdd} />
        <TodoList edit={edit} onPressAdd={setModalAdd} />
      </MainContext.Provider>
    </View>
  );
};

export default Main;
