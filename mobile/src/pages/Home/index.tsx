import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Container } from './styles';
import DailyInput from '../../components/DailyInput';
import { getUserData } from '../../utils/getUserData';
import firestore from '@react-native-firebase/firestore';
import { User } from '../../models/User';
import { ActivityIndicator } from 'react-native';
import { lightTheme } from '../../tokens/colors';
import WrappingView from '../../components/WrappingView';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyDatePicker from '../../components/DatePicker';

function Home() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
      .toISOString()
      .split('T')[0],
  );
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [initHTML, setInitHTML] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getUserData()
      .then(response => setUser(response))
      .catch(error => console.error('Error reading user data: ', error));
  }, []);

  useEffect(() => {
    setLoading(true);
    async function getInitHtml() {
      try {
        const registries = await firestore()
          .collection('Daily')
          .where('userId', '==', user?.id)
          .where('date', '==', selectedDate)
          .get();

        if (registries.docs.length > 0) {
          setInitHTML(registries.docs[0].get('content')?.toString()!!);
        } else {
          setInitHTML('');
        }
      } catch (error) {
        console.error('Error getting daily: ', error);
      }
    }

    if (user && user?.id) {
      getInitHtml().finally(() => setLoading(false));
    }
  }, [selectedDate, user]);

  useEffect(() => {
    async function getNewInfo() {
      try {
        const month = await AsyncStorage.getItem('@mybujo/selectedMonth');
        const monthNumber = Number(month);

        const year = await AsyncStorage.getItem('@mybujo/selectedYear');
        const yearNumber = Number(year);

        if (monthNumber && yearNumber) {
          setSelectedDate(
            new Date(yearNumber, monthNumber - 1, selectedDay)
              .toISOString()
              .split('T')[0],
          );
        }
      } catch (error) {
        console.error('GetNewInfo Error: ', error);
      }
    }

    if (showDatePicker === false) {
      getNewInfo();
    }
  }, [isFocused, today, showDatePicker, selectedDay]);

  return (
    <Container>
      <Header
        onSelect={setSelectedDay}
        onShowDatePicker={setShowDatePicker}
        selectedDate={selectedDate}
      />
      {loading ? (
        <WrappingView>
          <ActivityIndicator
            size={'large'}
            animating
            color={lightTheme.PRIMARY_COLOR}
          />
        </WrappingView>
      ) : (
        <DailyInput selectedDate={selectedDate} initHTML={initHTML} />
      )}
      {showDatePicker && <MyDatePicker setShow={setShowDatePicker} />}
    </Container>
  );
}

export default Home;
