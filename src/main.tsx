import React, {createContext, useEffect, useState} from 'react';
import {View} from 'react-native';
// import CalendarScreen from './components/calendarScreen';
import TodoList from './components/todoList';
import Header from './components/header';
import AddTodo from './components/addTodo';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MainContext = createContext<MainContextType>({
  data: {},
  selectedDay: dayjs().format('YYYY-MM-DD'),
  handleSelectedDay: () => {},
  calendarData: {},
  handleCheckBox: () => {},
});

export interface MainContextType {
  data?: {
    [key: string]: {
      todos: TodoType[];
    };
  };
  selectedDay: string;
  handleSelectedDay?: (day: CalendarsType) => void;
  calendarData?: {
    [key: string]: {
      selected?: boolean;
      marked?: boolean;
    };
  };
  handleCheckBox: (
    selected: string,
    todoIndex: number,
    checked: boolean,
  ) => void;
}

interface CalendarsType {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface TodoType {
  id: number;
  todo: string;
  isDone: boolean;
}
// 달력이 오늘자로 제대로 바뀌는지 확인

const Main = () => {
  // 전체 데이터
  const [data, setData] = useState({});

  // 편집, 메모추가 버튼
  const [edit, setEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  //달력 선택한 날짜
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  // 달력 데이터(marked+selected)
  const [calendarData, setCalendarData] = useState({});
  // 입력한 할일
  const [todoData, setTodoData] = useState('');
  //삭제 체크박스 버튼 인덱스들
  const [deleteChecked, setDeleteChecked] = useState<number[]>([]);

  console.log('메인페이지 무한루프 체크');

  // 달력 날짜 선택
  const handleSelectedDay = (day: CalendarsType) => {
    setSelectedDay(day.dateString);
  };

  // 편집버튼
  const handleEdit = () => {
    setEdit(!edit);
  };

  //데이터 가져오기
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('days');
      return jsonValue != null ? JSON.parse(jsonValue) : {};
    } catch (e) {
      console.log('데이터 가져오는 중 에러', e);
    }
  };

  // 저장버튼
  const handleAddTodo = async (selected: string, todo: string) => {
    try {
      const daysData = await getData();
      if (daysData[selected]) {
        const existingTodos: TodoType[] = daysData[selected].todos;
        const maxId = existingTodos.reduce(
          (max, item) => (item.id > max ? item.id : max),
          -1,
        );
        daysData[selected].todos.push({
          id: maxId + 1,
          todo: todo,
          isDone: false,
        });
      } else {
        daysData[selected] = {todos: [{id: 0, todo: todo, isDone: false}]};
      }
      await AsyncStorage.setItem('days', JSON.stringify(daysData));
      console.log('데이터 저장됨');

      setData(daysData);
    } catch (e) {
      console.log('데이터 저장중 에러', e);
    }
    setModalAdd(false);
    setTodoData('');
  };

  // 체크박스버튼
  const handleCheckBox = async (
    selected: string,
    todoIndex: number,
    checked: boolean,
  ) => {
    try {
      const daysData = await getData();
      const updatedTodos = daysData[selected].todos.map(
        (items: TodoType, index: number) => {
          if (index === todoIndex) {
            return {...items, isDone: checked};
          }
          return items;
        },
      );
      daysData[selected].todos = updatedTodos;
      await AsyncStorage.setItem('days', JSON.stringify(daysData));

      setData(daysData);
    } catch (e) {
      console.log('데이터 수정 중 에러', e);
    }
  };

  //삭제버튼
  const handleDelete = async () => {
    try {
      const daysData = await getData();
      // selectedDay의 todos 배열 가져오기
      const todos: TodoType[] = daysData[selectedDay]?.todos || null;
      if (!todos) {
        console.log('배열없음');
        return;
      }
      // todos 배열에서 삭제할 인덱스를 제거
      const updatedTodos = todos.filter(
        item => !deleteChecked.includes(item.id),
      );

      console.log('sortedIndex', JSON.stringify(updatedTodos));
      // 데이터 저장
      if (updatedTodos.length > 0) {
        daysData[selectedDay] = {todos: updatedTodos};
        await AsyncStorage.setItem('days', JSON.stringify(daysData));
        setData(daysData);
        console.log('데이터 삭제됨', JSON.stringify(daysData));
      } else {
        delete daysData[selectedDay];
        await AsyncStorage.setItem('days', JSON.stringify(daysData));
        setData(daysData);
        console.log('데이터 삭제됨', JSON.stringify(daysData));
      }
      //삭제 체크 데이터 초기화
      setDeleteChecked([]);
    } catch (e) {
      console.log('데이터 삭제중 에러', e);
    }
  };

  // 식제 체크박스 데이터 설정
  const handleDeleteCheckbox = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setDeleteChecked([...deleteChecked, id]);
    } else {
      setDeleteChecked(deleteChecked.filter(item => item !== id));
    }
  };

  // 데이터 초기화
  // const clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('초기화됨');
  //     const daysData = await getData();
  //     setData(daysData);
  //     console.log('초기화확인', daysData);
  //   } catch (e) {
  //     console.log('초기화중 오류발생');
  //   }
  // };

  // 초기 데이터 설정
  useEffect(() => {
    async function getDatas() {
      try {
        const jsonValue = await AsyncStorage.getItem('days');
        const aaa = jsonValue != null ? JSON.parse(jsonValue) : {};
        setData(aaa);
        console.log('초기 데이터 가져옴');
      } catch (e) {
        console.log('초기 데이터 설정 오류', e);
      }
    }
    getDatas();
  }, []);

  // 데이터를 markedData로 변경(todos 삭제, marked 추가)
  useEffect(() => {
    const obj = {
      days: Object.fromEntries(
        Object.keys(data).map(items => [items, {marked: true}]),
      ),
    };

    // 첫 렌더링시 selectedDay 기본 설정. 수정해야함
    const aaa = {[selectedDay]: {selected: true}};
    setCalendarData({...obj.days, ...aaa});
  }, [data, selectedDay]);

  //어떤 행동이 일어났을떄 삭제 체크박스 초기화.
  useEffect(() => {
    setDeleteChecked([]);
  }, [data, edit, selectedDay]);

  if (!data || !selectedDay) {
    return null;
  }
  return (
    <View className="w-full h-full space-y-5 bg-white">
      <MainContext.Provider
        value={{
          data,
          selectedDay,
          handleSelectedDay,
          calendarData,
          handleCheckBox,
        }}>
        <Header onPressEdit={handleEdit} edit={edit} />
        <AddTodo
          visible={modalAdd}
          onPressCancle={setModalAdd}
          onPressAdd={handleAddTodo}
          text={todoData}
          setText={setTodoData}
        />
        <TodoList
          edit={edit}
          onPressAdd={setModalAdd}
          onPressDelete={handleDelete}
          onPressDeleteCheckbox={handleDeleteCheckbox}
        />
      </MainContext.Provider>
      {/* <Button title="데이터 초기화" onPress={clearAll} /> */}
    </View>
  );
};

export default Main;
