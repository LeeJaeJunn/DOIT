import React from 'react';
import {Pressable, Text, View} from 'react-native';

const Header = ({
  onPressEdit,
  edit,
}: {
  onPressEdit: () => void;
  edit: boolean;
}) => {
  const onPressCalendarButton = () => {
    console.log('달력온');
  };

  return (
    <View className="w-full flex flex-row pt-5 pb-5 px-5 justify-between items-center border-b-4 border-gray-500">
      <Pressable onPress={onPressCalendarButton}>
        <Text>달력</Text>
      </Pressable>
      <Text className="text-2xl text-black">12.16</Text>
      <Pressable onPress={onPressEdit}>
        {!edit ? <Text>편집</Text> : <Text>취소</Text>}
      </Pressable>
    </View>
  );
};

export default Header;
