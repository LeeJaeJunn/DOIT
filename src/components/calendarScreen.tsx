import React, {useContext} from 'react';
import {View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {MainContext} from '../main';
import {MainContextType} from '../main';

const CalendarScreen = () => {
  const {handleSelectedDay, calendarData} =
    useContext<MainContextType>(MainContext);

  return (
    <View>
      <View className="bg-gray-500 h-1 w-full" />
      <Calendar
        monthFormat={'yyyy년 MM월'}
        markedDates={calendarData}
        pagingEnabled
        theme={{
          selectedDayBackgroundColor: '#009688',
        }}
        onDayPress={handleSelectedDay}
      />
    </View>
  );
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
