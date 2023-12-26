import React, {createContext, useEffect, useRef, useState} from 'react';
import {Button, View} from 'react-native';
// import CalendarScreen from './components/calendarScreen';
import TodoList from './components/todoList';
import Header from './components/header';
import AddTodo from './components/addTodo';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const MainContext = createContext<MainContextType>({
//   data: {},
//   selectedDay: dayjs().format('YYYY-MM-DD'),
//   markedData: {},
//   handleSelectedDay: () => {},
//   calendarData: {},
//   handleCheckBox: () => {},
// });

export const MainContext = createContext<MainContextType | null>(null);

export interface MainContextType {
  data?: {
    [key: string]: {
      todos: TodoType[];
    };
  };
  selectedDay?: string;
  markedData?: {
    [key: string]: {
      marked: boolean;
    };
  };
  handleSelectedDay?: (day: CalendarsType) => void;
  calendarData?: {
    [key: string]: {
      selected?: boolean;
      marked?: boolean;
    };
  };
  handleCheckBox?: (
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
  isDone: boolean;
  todo: string;
}
// 달력이 오늘자로 제대로 바뀌는지 확인

const Main = () => {
  // 전체 데이터
  const [data, setData] = useState({});

  // 편집, 메모추가 버튼
  const [edit, setEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  // 달력 Marked 데이터
  const [markedData, setMarkedData] = useState({});
  //달력 선택한 날짜
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  // 최종 Marked데이터 + selected데이터
  const [calendarData, setCalendarData] = useState({});
  // 입력한 할일
  const [todoData, setTodoData] = useState('');
  //삭제 체크박스 버튼 인덱스들
  const [deleteChecked, setDeleteChecked] = useState([]);
  //쳇 렌더링 확인
  const isMounted = useRef(false);

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
        daysData[selected].todos.push({todo: todo, isDone: false});
      } else {
        daysData[selected] = {todos: [{todo: todo, isDone: false}]};
      }
      await AsyncStorage.setItem('days', JSON.stringify(daysData));
      console.log('데이터 저장됨');
      // 임시로 저장, 체크박스 누를떄마다 데이터 새로가져옴.
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
      // 임시로 저장, 체크박스 누를떄마다 데이터 새로가져옴.
      setData(daysData);
    } catch (e) {
      console.log('데이터 수정 중 에러', e);
    }
  };

  //삭제버튼
  const handleDelete = async (day: string) => {
    // day는 selectedDay, index는 deleteChecked
    try {
      const daysData = await getData();
      // selectedDay의 todos 배열 가져오기
      const todos = daysData[day]?.todos || null;
      if (!todos) {
        console.log('배열없음');
        return;
      }
      // 삭제할 인덱스들을 정렬해 뒤에서부터 제거
      const sortedIndex = deleteChecked.sort((a, b) => b - a);
      // todos 배열에서 삭제할 인덱스를 제거
      const updatedTodos = todos.filter(
        (_, index) => !sortedIndex.includes(index),
      );
      console.log('sortedIndex', JSON.stringify(updatedTodos));
      // 데이터 저장
      if (updatedTodos.length > 0) {
        daysData[day] = {todos: updatedTodos};
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
      //삭제 체크박스 초기화
    } catch (e) {
      console.log('데이터 삭제중 에러', e);
    }
  };

  // 식제 체크박스 데이터 설정
  const handleDeleteCheckbox = (index: number, isSelected: boolean) => {
    if (isSelected) {
      setDeleteChecked([...deleteChecked, index]);
    } else {
      setDeleteChecked(deleteChecked.filter(item => item !== index));
    }
  };

  //삭제 체크박스 데이터 확인
  const deleteTest = () => {
    console.log('체크 확인', deleteChecked);
  };

  // 데이터들 확인
  const dataTest = () => {
    console.log('데이터 확인', JSON.stringify(data));
  };

  // 데이터 초기화
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      console.log('초기화됨');
      const daysData = await getData();
      setData(daysData);
      console.log('초기화됐나?', daysData);
    } catch (e) {
      console.log('초기화중 오류발생');
    }
  };

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
    setMarkedData(obj.days);

    // 첫 렌더링시 selectedDay 기본 설정. 수정해야함
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
          markedData,
          handleSelectedDay,
          calendarData,
          handleCheckBox,
        }}>
        <Header onPressEdit={handleEdit} edit={edit} />
        {/* <CalendarScreen /> */}
        {/* <Test /> */}
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
        {/* <Test /> */}
      </MainContext.Provider>
      <Button title="삭제 테스트" onPress={deleteTest} />
      <Button title="데이터 테스트" onPress={dataTest} />
      <Button title="데이터 초기화 테스트" onPress={clearAll} />
    </View>
  );
};

// 데이터 처리.
// const Test = () => {
//   const [selectedData, setSelectedData] = useState('2023-12-29');
//   const [todo, setTodo] = useState('테스트트5');
//   const [isDone, setIsDone] = useState(true);
//   // 데이터 가져오기
//   const getData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('days');
//       return jsonValue != null ? JSON.parse(jsonValue) : {};
//     } catch (e) {
//       console.log('데이터 가져오는중 에러 발생', e);
//       return {};
//     }
//   };
//   //데이터 저장
//   const onPressSave = async (selectedData, newTodo) => {
//     try {
//       const daysData = await getData();
//       if (daysData[selectedData]) {
//         daysData[selectedData].todos.push({todo: newTodo, isDone: false});
//       } else {
//         daysData[selectedData] = {todos: [{todo: newTodo, isDone: false}]};
//       }
//       await AsyncStorage.setItem('days', JSON.stringify(daysData));
//       console.log('데이터 보내짐');
//     } catch (e) {
//       console.log('에러러', e);
//     }
//   };

//   const onPressEdit = async (selectedData, todoIndex, isDone) => {
//     try {
//       const daysData = await getData();
//       const updatedTodos = daysData[selectedData].todos.map((items, index) => {
//         if (index === todoIndex) {
//           return {...items, isDone: isDone};
//         }
//         return items;
//       });
//       daysData[selectedData].todos = updatedTodos;
//       await AsyncStorage.setItem('days', JSON.stringify(daysData));
//       console.log('데이터 수정됨');
//     } catch (e) {
//       console.log('데이터 수정 중 에러', e);
//     }
//   };
//   // 데이터 불러와졌는지 확인
//   const testSave = async () => {
//     try {
//       const daysData = await getData();
//       console.log('데이터 가져와졌나?', JSON.stringify(daysData));
//     } catch (e) {
//       console.log('오류발생!', e);
//     }
//   };

//   // 데이터 초기화
//   const clearAll = async () => {
//     try {
//       await AsyncStorage.clear();
//       console.log('초기화됨');
//     } catch (e) {
//       console.log('초기화중 오류발생');
//     }
//   };

//   return (
//     <View className="flex flex-col space-y-5">
//       <Text className="text-black text-2xl">테스트</Text>
//       <Pressable
//         className="bg-blue-300"
//         onPress={() => onPressSave(selectedData, todo)}>
//         <Text>저장</Text>
//       </Pressable>
//       <Pressable className="bg-blue-300" onPress={testSave}>
//         <Text>불러오기</Text>
//       </Pressable>
//       <Pressable
//         className="bg-blue-300"
//         onPress={() => {
//           onPressEdit(selectedData, 0, isDone);
//         }}>
//         <Text>수정</Text>
//       </Pressable>
//       <Pressable className="bg-blue-300" onPress={clearAll}>
//         <Text>초기화</Text>
//       </Pressable>
//     </View>
//   );
// };

export default Main;
