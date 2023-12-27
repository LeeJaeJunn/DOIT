import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
    <View
      style={styles.viewBackground}
      className={
        isDone
          ? 'flex flex-row items-center justify-between mt-3 w-100vw rounded-lg bg-gray-300'
          : 'flex flex-row items-center justify-between mt-3 w-100vw rounded-lg bg-gray-100'
      }>
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
          checkBoxColor="#606060"
        />
      )}
      <View
        style={styles.textBackground}
        className="flex flex-row items-center justify-between">
        <Text
          className={isDone ? 'text-lg  text-gray-400' : 'text-lg text-black'}>
          {data}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewBackground: {
    flex: 1,
  },
  textBackground: {
    flex: 0.95,
  },
  checkboxBackground: {
    flex: 0.1,
  },
});

export default TodoBox;
