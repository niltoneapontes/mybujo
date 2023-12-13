import React from 'react';
import { Container, DailyTextInput } from './styles';

interface DailyInputProps {
  selectedDate: String;
}

function DailyInput({ selectedDate }: DailyInputProps) {
  console.log(selectedDate);
  return (
    <Container>
      <DailyTextInput multiline textAlign="left" />
    </Container>
  );
}

export default DailyInput;
