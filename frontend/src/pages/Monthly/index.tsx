import React, { useEffect, useState } from 'react';
import SelectorHeader from '../../components/SelectorHeader';
import { Container } from './styles';
import moment from 'moment';
import MonthlyInput from '../../components/MonthlyInput';
import { User } from '../../models/User';
import { getUserData } from '../../utils/getUserData';
import { lightTheme } from '../../tokens/colors';
import WrappingView from '../../components/WrappingView';
import Toast from '../../components/Toast';
import { db } from '../../App';

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

function nextEnumValue(enumObj: any, valorAtual: string) {
  const chaves = Object.keys(enumObj);
  const valores = chaves.map((chave: any) => enumObj[chave]);

  const indiceAtual = valores.indexOf(valorAtual);
  const proximoIndice = (indiceAtual + 1) % valores.length;

  return valores[proximoIndice];
}

function previousEnumValue(enumObj: any, valorAtual: string) {
  const chaves = Object.keys(enumObj);
  const valores = chaves.map((chave: any) => enumObj[chave]);

  const indiceAtual = valores.indexOf(valorAtual);
  const indiceAnterior = (indiceAtual - 1 + valores.length) % valores.length;

  return valores[indiceAnterior];
}

function getEnumIndex(enumObj: any, value: string) {
  const valores = Object.values(enumObj);
  const index = valores.indexOf(value) + 1;
  return index;
}

function Monthly() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();
  // @ts-ignore
  const currentMonth = Months[moment(today).format('MMMM').toUpperCase()];
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [loading, setLoading] = useState(false);

  const [initHTML, setInitHTML] = useState('');
  const [user, setUser] = useState<User>();
  const [message, setMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessage = () => {
    const timeout = setTimeout(() => {
      setMessage(null);
      setSuccessMessage(null);
    }, 4000);
    clearTimeout(timeout);
  };

  useEffect(() => {
    getUserData()
      .then(response => setUser(response))
      .catch(error => console.error('Error reading user data: ', error));
  }, []);

  useEffect(() => {
    const index = getEnumIndex(Months, selectedMonth);
    async function setMonth(monthIndex: number) {
      try {
        await localStorage.setItem(
          '@mybujo/selectedMonth',
          monthIndex.toString(),
        );
      } catch (error) {
        console.error(error);
      }
    }

    setMonth(index);
  }, [selectedMonth]);

  useEffect(() => {
    setLoading(true);
    async function getInitHtml() {
      try {
        const registries = await db
          .collection('Monthly')
          .where('userId', '==', user?.id)
          .where('month', '==', selectedMonth)
          .where('year', '==', selectedYear.toString())
          .get();

        if (registries.docs.length > 0) {
          setInitHTML(registries.docs[0].get('content')?.toString()!!);
        } else {
          setInitHTML('');
        }
      } catch (error) {
        setMessage('Oops... Não conseguimos nos conectar com o servidor.');
        clearMessage();
        console.error('Error getting monthly: ', error);
      } finally {
        setLoading(false);
      }
    }

    if (user && user?.id) {
      getInitHtml();
    }
  }, [selectedMonth, selectedYear, user]);

  useEffect(() => {
    async function getNewInfo() {
      const year = await localStorage.getItem('@mybujo/selectedYear');
      const yearNumber = Number(year);

      const month = await localStorage.getItem('@mybujo/selectedMonth');
      const monthNumber = Number(month);

      if (yearNumber) {
        setSelectedYear(yearNumber);
      }
      if (monthNumber) {

        setSelectedMonth(
            // @ts-ignore
          Months[
            moment(new Date(yearNumber, Number(monthNumber) - 1))
              .format('MMMM')
              .toUpperCase()
          ],
        );
      }
    }

    getNewInfo();
  }, [today]);

  return (
    <>
      <Container>
        <SelectorHeader
          current={selectedMonth}
          suffix={selectedYear.toString()}
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
            Carregando...
          </WrappingView>
        ) : (
          <MonthlyInput
            setMessage={setSuccessMessage}
            clearMessage={clearMessage}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            initHTML={initHTML}
          />
        )}
      </Container>
      {message && <Toast text={message} type="error" />}
      {successMessage && <Toast text={successMessage} type="success" />}
    </>
  );
}

export default Monthly;
