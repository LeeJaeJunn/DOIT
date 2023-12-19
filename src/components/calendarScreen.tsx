import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {MainContext} from '../main';

const CalendarScreen = ({
  handleSelectedDay,
  selectedDay,
}: {
  handleSelectedDay: (day: string) => void;
  selectedDay: string;
}) => {
  const {data} = useContext(MainContext);
  const [combinedData, setCombinedData] = useState(data?.days);

  // console.log('여기여기', selectedDay);

  const handleCombineData = () => {
    setCombinedData(data.days);
    setCombinedData(items => {
      return {
        ...items,
        ...{[selectedDay]: {selected: true}},
      };
    });
    console.log('실행?');
  };

  const onSelectedDay = day => {
    console.log('데이데이', day);
    if (selectedDay != null) {
      setCombinedData(items => {
        console.log('테스트', JSON.stringify(items));
        console.log(
          '테스트2',
          JSON.stringify({...items, ...{[selectedDay]: {selected: false}}}),
        );
        return {
          ...items,
          ...{[selectedDay]: {selected: false}},
        };
      });
    }
    setCombinedData(items => {
      console.log('테스트', JSON.stringify(items));
      console.log(
        '테스트2',
        JSON.stringify({...items, ...{[selectedDay]: {selected: false}}}),
      );
      return {
        ...items,
        ...{[selectedDay]: {selected: false}},
      };
    });
    setCombinedData(items => {
      return {
        ...items,
        ...{[day.dateString]: {selected: true}},
      };
    });
    handleSelectedDay(day.dateString);
  };

  return (
    <View>
      <Calendar
        monthFormat={'yyyy년 MM월'}
        // markedDates={data.days}
        markedDates={{
          '2023-12-12': {
            marked: true,
          },
          '2023-12-13': {
            selected: true,
          },
        }}
        pagingEnabled
        theme={{
          selectedDayBackgroundColor: '#009688',
        }}
        // onDayPress={day => {
        //   handleSelectedDay(day);
        //   handleCombineData();
        //   console.log(selectedDay);
        // }}
        onDayPress={day => onSelectedDay(day)}
        // markedDates={{
        //   [selected]: {selected: true},
        // }}
        // markedDates={markedDates}
      />
    </View>
  );
};

export default CalendarScreen;

const markedDates = {
  '2023-12-13': {
    selected: true,
    marked: true,
    todos: [{id: 1}, {id: 2}],
  },
  '2023-12-14': {
    marked: true,
  },
  '2023-12-15': {
    marked: true,
  },
};

LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['월', '화', '수', '목', '금', '토', '일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
};
LocaleConfig.defaultLocale = 'ko';
