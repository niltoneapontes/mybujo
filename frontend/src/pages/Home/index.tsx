import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Container } from './styles';
import DailyInput from '../../components/DailyInput';
import { getUserData } from '../../utils/getUserData';
import { User } from '../../models/User';
import { lightTheme } from '../../tokens/colors';
import WrappingView from '../../components/WrappingView';
import MyDatePicker from '../../components/DatePicker';
import Toast from '../../components/Toast';
import { db } from '../../App';
import { DocumentData, collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';

function Home() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
      .toISOString()
      .split('T')[0],
  );
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [initHTML, setInitHTML] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [showDatePicker, setShowDatePicker] = useState(false);
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
    setLoading(true);
    async function getInitHtml() {
      try {
        const q = query(collection(db, 'Daily'), where('userId', '==', user?.id), where('date', '==', selectedDate))

        const registries = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(doc.data() && doc.data().content) {
              setInitHTML(doc.data().content)
            }
          })
        })

      } catch (error) {
        setMessage('Oops... Não conseguimos nos conectar com o servidor.');
        clearMessage();
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
        const month = await localStorage.getItem('@mybujo/selectedMonth');
        const monthNumber = Number(month);

        const year = await localStorage.getItem('@mybujo/selectedYear');
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
  }, [today, showDatePicker, selectedDay]);

  return (
    <>
      <Container>
        <Header
          onSelect={setSelectedDay}
          onShowDatePicker={setShowDatePicker}
          selectedDate={selectedDate}
        />
        {loading ? (
          <WrappingView>
            Carregando...
          </WrappingView>
        ) : (
          <DailyInput
            selectedDate={selectedDate}
            initHTML={initHTML}
            setMessage={setSuccessMessage}
            clearMessage={clearMessage}
            setErrorMessage={setMessage}
          />
        )}
        {showDatePicker && <MyDatePicker setShow={setShowDatePicker} />}
      </Container>
      {message && <Toast text={message} type="error" />}
      {successMessage && <Toast text={successMessage} type="success" />}
    </>
  );
}

export default Home;
