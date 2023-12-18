import {Pressable, ScrollView, Text, View} from 'react-native';

const Main = () => {
  return (
    <View className="w-full h-full space-y-3">
      <View className="w-full flex flex-row pt-5 pb-5 px-5 justify-between items-center border-b border-sky-500">
        <Text>달력</Text>
        <Text className="text-2xl text-black">할일 목록</Text>
        <Text>추가</Text>
      </View>

      <ScrollView className="flex flex-col px-2">
        <View className="bg-green-200 rounded-lg">
          <Text className="text-xl">할일./ㅁㄴㅇㅁㄴㅇㅁㄴㅇ.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Main;
