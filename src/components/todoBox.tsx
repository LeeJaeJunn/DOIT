import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {MainContext, MainContextType} from '../main';

const TodoBox = ({
  data,
  edit,
  index,
  id,
  isDone,
  onPressDeleteCheckbox,
}: {
  data: string;
  edit: boolean;
  index: number;
  id: number;
  isDone: boolean;
  onPressDeleteCheckbox: (id: number, isSelected: boolean) => void;
}) => {
  const [isDelete, setIsDelete] = useState(false);
  const {selectedDay, handleCheckBox} =
    useContext<MainContextType>(MainContext);

  // 편집취소를 누르면 삭제 체크박스 해제
  useEffect(() => {
    setIsDelete(false);
  }, [edit]);

  return (
    <View className="flex flex-row items-center justify-between mt-3 w-100vw">
      {edit ? (
        <CheckBox
          onClick={() => {
            onPressDeleteCheckbox(id, !isDelete);
            setIsDelete(!isDelete);
          }}
          isChecked={isDelete}
          checkBoxColor="#FF66b2"
        />
      ) : (
        <CheckBox
          onClick={() => {
            handleCheckBox(selectedDay, index, !isDone);
          }}
          isChecked={isDone}
        />
      )}
      <View
        className={
          isDone
            ? 'bg-gray-500 rounded-lg  flex flex-row items-center justify-between w-5/6 '
            : 'bg-gray-200 rounded-lg  flex flex-row items-center justify-between w-5/6'
        }>
        <Text className={isDone ? 'text-xl line-through' : 'text-xl'}>
          {data}
        </Text>
      </View>
    </View>
  );
};

export default TodoBox;
