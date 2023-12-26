import React, { useEffect, useState } from 'react';
import SelectorHeader from '../../components/SelectorHeader';
import { Container } from './styles';
import { ActivityIndicator } from 'react-native';
import FutureInput from '../../components/FutureInput';
import { getUserData } from '../../utils/getUserData';
import firestore from '@react-native-firebase/firestore';
import { User } from '../../models/User';
import { lightTheme } from '../../tokens/colors';
import WrappingView from '../../components/WrappingView';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Future() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [initHTML, setInitHTML] = useState('');
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUserData()
      .then(response => setUser(response))
      .catch(error => console.error('Error reading user data: ', error));

    async function getYear() {
      const result = await AsyncStorage.getItem('@mybujo/selectedYear');
      if (result) {
        setSelectedYear(Number(result));
      }
    }

    getYear();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function getInitHtml() {
      try {
        const registries = await firestore()
          .collection('Future')
          .where('userId', '==', user?.id)
          .where('year', '==', selectedYear.toString())
          .get();

        if (registries.docs.length > 0) {
          setInitHTML(registries.docs[0].get('content')?.toString()!!);
        } else {
          setInitHTML('');
        }
      } catch (error) {
        console.error('Error getting future: ', error);
      } finally {
        setLoading(false);
      }
    }

    if (user && user?.id) {
      getInitHtml();
    }
  }, [selectedYear, user]);

  useEffect(() => {
    async function setYear(selectedYearValue: number) {
      await AsyncStorage.setItem(
        '@mybujo/selectedYear',
        selectedYearValue.toString(),
      );
    }

    setYear(selectedYear);
  }, [selectedYear]);

  return (
    <Container>
      <SelectorHeader
        current={selectedYear}
        goOneBack={() => {
          setLoading(true);
          setSelectedYear(selectedYear - 1);
          setLoading(false);
        }}
        goOneForward={() => {
          setLoading(true);
          setSelectedYear(selectedYear + 1);
          setLoading(false);
        }}
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
        <FutureInput selectedYear={selectedYear} initHTML={initHTML} />
      )}
    </Container>
  );
}

export default Future;
