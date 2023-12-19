import React, {useState} from 'react';
import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';

const AddTodo = ({
  visible,
  onPressCancle,
}: {
  visible: boolean;
  onPressCancle: (value: boolean) => void;
}) => {
  const [text, onChangeText] = useState('할 일을 입력하세요.');

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.text}>할 일을 입력하세요</Text>
          </View>
          <TextInput
            style={styles.input}
            multiline
            value={text}
            onChangeText={onChangeText}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button onPress={() => onPressCancle(false)} title="저장" />
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
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddTodo;
