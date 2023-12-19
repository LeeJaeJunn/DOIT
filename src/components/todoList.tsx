import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import data from '../db/data.json';
import TodoBox from './todoBox';

const TodoList = ({
  edit,
  onPressAdd,
}: {
  edit: boolean;
  onPressAdd: (value: boolean) => void;
}) => {
  return (
    <ScrollView className="flex flex-col key px-3">
      <View className="px-3 pt-3 flex items-center">
        {edit ? (
          <Pressable className="border-b border-t border-[#ff66b2] ">
            <Text className="text-xl">삭제</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => onPressAdd(true)}
            className="border-y border-gray-500 ">
            <Text className="text-xl">할일을 추가하세요</Text>
          </Pressable>
        )}
      </View>
      {data.todos.map(data => (
        <TodoBox data={data.todo} key={data.id} edit={edit} />
      ))}
    </ScrollView>
  );
};

export default TodoList;
