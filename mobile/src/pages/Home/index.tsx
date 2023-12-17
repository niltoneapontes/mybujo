import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Container } from './styles';
import DailyInput from '../../components/DailyInput';
import { getUserData } from '../../utils/getUserData';
import firestore from '@react-native-firebase/firestore';
import { User } from '../../models/User';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { lightTheme } from '../../tokens/colors';
import WrappingView from '../../components/WrappingView';

function Home() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split('T')[0],
  );
  const [initHTML, setInitHTML] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    if (user && user?.id) {
      getInitHtml();
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
