import React from 'react';
import { Text, View } from 'react-native';
import { lightTheme } from '../../tokens/colors';

function Performance() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text
        style={{
          color: lightTheme.PRIMARY_COLOR,
          fontSize: 32,
          fontWeight: 'bold',
          alignSelf: 'center',
        }}>
        Oops... Em breve
      </Text>
    </View>
  );
}

export default Performance;
