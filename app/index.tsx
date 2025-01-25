import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, } from 'react-native';
import data from '@/assets/data.json';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar'
interface User {
  name: string;
  role: string;
  totalValue: number;
}

interface PortfolioItem {
  name: string;
  balance: number;
  earnings: number;
}

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
}

interface UserData {
  user: User;
  portfolio: PortfolioItem[];
  watchlist: WatchlistItem[];
}

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setUserData(data);
  }, []);

  if (!userData) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='text-lg font-bold'>Loading...</Text>
      </View>
    );
  }

  const renderPortfolioItem = ({ item }: { item: PortfolioItem }) => (
    <View
      key={item.name}
      className='flex-col justify-between items-center bg-white p-4 mb-2 rounded-lg shadow'
      style={{ marginRight: 12 }}
    >
      <View className='flex-col mb-6 mt-4'>
        <Text className='text-lg font-bold'>{item.name}</Text>
      </View>
      <View className='flex-row justify-between items-center gap-20'>
        <View>
          <Text>Balance</Text>
          <Text className='text-gray-500'>${item.balance.toLocaleString()}</Text>
        </View>
        <View>
          <Text>Earnings</Text>
          <Text className='text-green-500 font-bold'>+${item.earnings.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );

  const renderWatchlistItem = ({ item }: { item: WatchlistItem }) => (
    <View className='flex-row justify-between items-center bg-white p-4 mb-2 rounded-lg shadow'>
      <View>
        <Text className='text-lg font-bold'>{item.symbol}</Text>
        <Text className='text-gray-500'>{item.name}</Text>
      </View>
      <View>
        <Text className='text-lg font-bold'>${item.price}</Text>
        <Text className={item.change > 0 ? 'text-green-500' : 'text-red-500'}>
          {item.change > 0 ? `+${item.change}` : item.change} ({item.percentChange}%)
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className='flex-1 bg-gray-50 pt-5'>
      {/* Header Section */}
      <View className=' m-2 flex flex-row justify-between items-center p-4'>
        <View className='flex flex-row items-center gap-1'>
          <AntDesign name="user" size={24} color="black" className='bg-gray-300 rounded-full p-2' />
          <View >
            <Text className='text-black text-lg font-bold'>{userData.user.name}</Text>
            <Text className='text-black text-sm'>{userData.user.role}</Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
      <FlatList
        data={[1]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => (
          <>
            {/* Total Value Section */}
            <View className='m-3 p-4 bg-blue-500 rounded-md'>
              <View className='mt-5 ml-3'>
                <Text className='text-white text-md font-bold'>Total Value</Text>
                <Text className='text-white text-2xl font-bold mt-2'>${userData.user.totalValue.toLocaleString()}</Text>
              </View>
            </View>

            {/* Portfolio Section */}
            <View className='p-4'>
              <Text className='text-lg font-bold mb-3'>Your Portfolio</Text>
              <FlatList
                horizontal={true}
                data={userData.portfolio}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderPortfolioItem}
              />
            </View>

            {/* Watchlist Section */}
            <View className='p-4'>
              <Text className='text-lg font-bold mb-3'>Your Watchlist</Text>
              <FlatList
                data={userData.watchlist}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderWatchlistItem}
              />
            </View>
          </>
        )}
      />
    <StatusBar style='dark'/>
    </SafeAreaView>
  );
};

export default App;