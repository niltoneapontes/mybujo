import React from 'react';
import { Container, IconButton, Title } from './styles';
import Icons from 'react-native-vector-icons/Feather';

interface SelectorHeaderProps {
  current: any;
  goOneBack: () => void;
  goOneForward: () => void;
}

function SelectorHeader({
  current: currentMonth,
  goOneBack: goOneMonthBack,
  goOneForward: goOneMonthForward,
}: SelectorHeaderProps) {
  return (
    <Container>
      <IconButton onPress={() => goOneMonthBack()}>
        <Icons name="chevron-left" size={24} />
      </IconButton>
      <Title>{currentMonth}</Title>
      <IconButton onPress={() => goOneMonthForward()}>
        <Icons name="chevron-right" size={24} />
      </IconButton>
    </Container>
  );
}

export default SelectorHeader;
