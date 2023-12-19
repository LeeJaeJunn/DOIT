import React from 'react';
import {View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View>
      <Calendar
        monthFormat={'yyyy년 MM월'}
        markedDates={markedData}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

const markedData = {
  '2023-12-17': {
    selected: true,
  },
  '2023-12-18': {
    marked: true,
  },
  '2023-12-19': {
    marked: true,
  },
};

export default CalendarScreen;

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
