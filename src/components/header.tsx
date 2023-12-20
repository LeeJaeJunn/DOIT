import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import CalendarScreen from './calendarScreen';

const Header = ({
  onPressEdit,
  edit,
}: {
  onPressEdit: () => void;
  edit: boolean;
}) => {
  const [viewCalendar, setViewCalendar] = useState(false);

  const handleViewCalendar = () => {
    setViewCalendar(!viewCalendar);
  };

  return (
    <View className=" flex flex-col">
      <View className="w-full flex flex-row pt-5 pb-5 px-5 justify-between items-center">
        <Pressable onPress={handleViewCalendar}>
          <Text>달력</Text>
        </Pressable>
        <Text className="text-2xl text-black">Memo List</Text>
        <Pressable onPress={onPressEdit}>
          {!edit ? <Text>편집</Text> : <Text>취소</Text>}
        </Pressable>
      </View>

      {viewCalendar && <CalendarScreen />}

      <View className="flex flex-row items-center justify-center space-x-1">
        <View className="bg-gray-500 h-1 w-full" />
        <Text>12.16</Text>
        <View className="bg-gray-500 h-1 w-full" />
      </View>
    </View>
  );
};

export default Header;
