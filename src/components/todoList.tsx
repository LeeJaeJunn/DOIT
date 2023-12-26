import React, {useContext} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import TodoBox from './todoBox';
import {MainContext, MainContextType} from '../main';

const TodoList = ({
  edit,
  onPressAdd,
  onPressDelete,
  onPressDeleteCheckbox,
  deleteChecked,
}: {
  edit: boolean;
  onPressAdd: (value: boolean) => void;
  // onPressDelete: (selectedDay: string, index: )
  onPressDeleteCheckbox: (index: number, isSelected: boolean) => void;
}) => {
  const {data, selectedDay} = useContext<MainContextType>(MainContext);

  if (!data || !selectedDay) {
    return null;
  }
  return (
    <ScrollView className="flex flex-col key px-3">
      <View className="px-3 pt-3 flex items-center">
        {edit ? (
          <Pressable
            onPress={() => onPressDelete(selectedDay, deleteChecked)}
            className="border-b border-t border-[#ff99cc] ">
            <Text className="text-xl">삭제</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => onPressAdd(true)}
            className="border-y border-gray-500 ">
            <Text className="text-xl">메모를 추가하세요</Text>
          </Pressable>
        )}
      </View>
      {data[selectedDay]?.todos?.map((items, index) => (
        <TodoBox
          data={items.todo}
          isDone={items.isDone}
          key={index}
          edit={edit}
          index={index}
          onPressDeleteCheckbox={onPressDeleteCheckbox}
        />
      ))}
    </ScrollView>
  );
};

export default TodoList;
