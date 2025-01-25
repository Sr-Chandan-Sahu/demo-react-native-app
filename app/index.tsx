import { Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
const index = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-red-500'>Welcome to new Project</Text>
      <StatusBar style='dark'/>
      <Link href='/profile' className='text-blue-600'>Go to Profile</Link>
    </View>
  )
}

export default index

