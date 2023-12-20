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

function Home() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
      .toISOString()
      .split('T')[0],
  );
  const [initHTML, setInitHTML] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

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

  return (
    <Container>
      <Header onSelect={setSelectedDate} />
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
    </Container>
  );
}

export default Home;
