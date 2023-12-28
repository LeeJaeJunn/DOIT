import React, {useContext} from 'react';
import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import {MainContext, MainContextType} from '../main';

const AddTodo = ({
  visible,
  onPressCancle,
  onPressAdd,
  text,
  setText,
}: {
  visible: boolean;
  onPressCancle: (value: boolean) => void;
  onPressAdd: (selected: string, todo: string) => void;
  text: string;
  setText: (value: string) => void;
}) => {
  const {selectedDay} = useContext<MainContextType>(MainContext);

  if (!selectedDay) {
    return null;
  }
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.text}>메모를 입력하세요</Text>
          </View>
          <TextInput
            style={styles.input}
            multiline
            value={text}
            onChangeText={setText}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button onPress={() => onPressAdd(selectedDay, text)} title="저장" />
          <View style={{width: 10}} />
          <Button
            color={'red'}
            onPress={() => onPressCancle(false)}
            title="취소"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  modalContent: {
    width: '80%',
    minHeight: '40%',
    padding: 20,
    paddingBottom: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '30%',
    width: '100%',
    backgroundColor: 'rgba(224, 224, 224, 1)',
    borderRadius: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default AddTodo;
