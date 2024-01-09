import React, { useEffect, useState } from 'react';
import SelectorHeader from '../../components/SelectorHeader';
import { Container } from './styles';
import FutureInput from '../../components/FutureInput';
import { getUserData } from '../../utils/getUserData';
import { User } from '../../models/User';
import WrappingView from '../../components/WrappingView';
import Toast from '../../components/Toast';
import { db } from '../../App';

function Future() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
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

    async function getYear() {
      const result = await localStorage.getItem('@mybujo/selectedYear');
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
        const registries = await db
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
        setMessage('Oops... Não conseguimos nos conectar com o servidor.');
        clearMessage();
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
      await localStorage.setItem(
        '@mybujo/selectedYear',
        selectedYearValue.toString(),
      );
    }

    setYear(selectedYear);
  }, [selectedYear]);

  return (
    <>
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
            Carregando
          </WrappingView>
        ) : (
          <FutureInput
            selectedYear={selectedYear}
            initHTML={initHTML}
            setMessage={setSuccessMessage}
            clearMessage={clearMessage}
          />
        )}
      </Container>
      {message && <Toast text={message} type="error" />}
      {successMessage && <Toast text={successMessage} type="success" />}
    </>
  );
}

export default Future;
