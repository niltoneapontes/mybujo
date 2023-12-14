import React, { useState } from 'react';
import Header from '../../components/Header';
import { Container } from './styles';
import DailyInput from '../../components/DailyInput';

function Home() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split('T')[0],
  );

  return (
    <Container>
      <Header onSelect={setSelectedDate} />
      {selectedDate && <DailyInput selectedDate={selectedDate} />}
    </Container>
  );
}

export default Home;
