import React, {useContext} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import TodoBox from './todoBox';
import {MainContext} from '../main';

const TodoList = ({
  edit,
  onPressAdd,
  selectedDay,
}: {
  edit: boolean;
  onPressAdd: (value: boolean) => void;
  selectedDay: string;
}) => {
  const {data} = useContext(MainContext);

  return (
    <ScrollView className="flex flex-col key px-3">
      <View className="px-3 pt-3 flex items-center">
        {edit ? (
          <Pressable className="border-b border-t border-[#ff99cc] ">
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
      {data.selected?.todos.map(items => (
        <TodoBox data={items.todo} key={items.id} edit={edit} />
      ))}
    </ScrollView>
  );
};

export default TodoList;
