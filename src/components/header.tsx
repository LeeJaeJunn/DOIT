import React, {useContext, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import CalendarScreen from './calendarScreen';
import {MainContext, MainContextType} from '../main';

const Header = ({
  onPressEdit,
  edit,
}: {
  onPressEdit: () => void;
  edit: boolean;
}) => {
  const {selectedDay} = useContext<MainContextType>(MainContext);
  const [viewCalendar, setViewCalendar] = useState(false);

  const handleViewCalendar = () => {
    setViewCalendar(!viewCalendar);
  };

  if (!selectedDay) {
    return null;
  }
  return (
    <View className=" flex flex-col">
      <View className="w-full flex flex-row py-1  px-5 justify-between items-center">
        <Pressable onPress={handleViewCalendar} className="px-3 py-3">
          <Text>달력</Text>
        </Pressable>
        <Text className="text-xl text-black">{selectedDay}</Text>
        <Pressable onPress={onPressEdit} className="px-3 py-3">
          {!edit ? <Text>편집</Text> : <Text>취소</Text>}
        </Pressable>
      </View>

      {viewCalendar && <CalendarScreen />}

      <View className="bg-gray-500 h-1 w-full" />
    </View>
  );
};

export default Header;
