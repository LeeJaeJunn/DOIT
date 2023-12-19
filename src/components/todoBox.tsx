import React, {useState} from 'react';
import {Text, View} from 'react-native';
import CheckBox from 'react-native-check-box';

const TodoBox = ({data, edit}: {data: string; edit: boolean}) => {
  const [isDone, setIsDone] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleIsDone = () => {
    setIsDone(!isDone);
  };

  const HandleDelete = () => {
    setIsDelete(!isDelete);
  };

  return (
    <View className="flex flex-row items-center justify-between mt-3 w-100vw">
      {edit && (
        <CheckBox
          onClick={HandleDelete}
          isChecked={isDelete}
          checkBoxColor="#FF66b2"
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
      {!edit && <CheckBox onClick={handleIsDone} isChecked={isDone} />}
    </View>
  );
};

export default TodoBox;
