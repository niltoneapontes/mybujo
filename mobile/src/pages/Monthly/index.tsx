import React, { useEffect, useState } from 'react';
import SelectorHeader from '../../components/SelectorHeader';
import { Container } from './styles';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
import MonthlyInput from '../../components/MonthlyInput';
import { User } from '../../models/User';
import { getUserData } from '../../utils/getUserData';
import firestore from '@react-native-firebase/firestore';
import { lightTheme } from '../../tokens/colors';
import WrappingView from '../../components/WrappingView';

export enum Months {
  JANUARY = 'Janeiro',
  FEBRUARY = 'Fevereiro',
  MARCH = 'Março',
  APRIL = 'Abril',
  MAY = 'Maio',
  JUNE = 'Junho',
  JULY = 'Julho',
  AUGUST = 'Agosto',
  SEPTEMBER = 'Setembro',
  OCTOBER = 'Outubro',
  NOVEMBER = 'Novembro',
  DECEMBER = 'Dezembro',
}

function nextEnumValue(enumObj, valorAtual) {
  const chaves = Object.keys(enumObj);
  const valores = chaves.map(chave => enumObj[chave]);

  const indiceAtual = valores.indexOf(valorAtual);
  const proximoIndice = (indiceAtual + 1) % valores.length;

  return valores[proximoIndice];
}

function previousEnumValue(enumObj, valorAtual) {
  const chaves = Object.keys(enumObj);
  const valores = chaves.map(chave => enumObj[chave]);

  const indiceAtual = valores.indexOf(valorAtual);
  const indiceAnterior = (indiceAtual - 1 + valores.length) % valores.length;

  return valores[indiceAnterior];
}

function Monthly() {
  const today = new Date();
  const currentMonth = Months[moment(today).format('MMMM').toUpperCase()];
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [loading, setLoading] = useState(false);

  const [initHTML, setInitHTML] = useState('');
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
          .collection('Monthly')
          .where('userId', '==', user?.id)
          .where('month', '==', selectedMonth)
          .get();

        if (registries.docs.length > 0) {
          setInitHTML(registries.docs[0].get('content')?.toString()!!);
        } else {
          setInitHTML('');
        }
      } catch (error) {
        console.error('Error getting monthly: ', error);
      } finally {
        setLoading(false);
      }
    }

    if (user && user?.id) {
      getInitHtml();
    }
  }, [selectedMonth, user]);

  return (
    <Container>
      <SelectorHeader
        current={selectedMonth}
        goOneBack={() => {
          setLoading(true);
          setSelectedMonth(previousEnumValue(Months, selectedMonth));
          setLoading(false);
        }}
        goOneForward={() => {
          setLoading(true);
          setSelectedMonth(nextEnumValue(Months, selectedMonth));
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
        <MonthlyInput selectedMonth={selectedMonth} initHTML={initHTML} />
      )}
    </Container>
  );
}

export default Monthly;
