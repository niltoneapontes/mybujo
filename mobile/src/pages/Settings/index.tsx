import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

function Settings({navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Text>Home</Text>
    </TouchableOpacity>
  );
}

export default Settings;
