import React, { useState } from 'react';
import Header from '../../components/Header';
import { Container } from './styles';
import DailyInput from '../../components/DailyInput';

function Home() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toISOString());

  return (
    <Container>
      <Header onSelect={setSelectedDate} />
      <DailyInput selectedDate={selectedDate} />
    </Container>
  );
}

export default Home;
