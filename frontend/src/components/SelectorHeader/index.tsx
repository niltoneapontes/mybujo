import React from 'react';
import {
  Container,
  IconButton,
  Subtitle,
  TextContainer,
  Title,
} from './styles';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import { lightTheme } from '../../tokens/colors';

interface SelectorHeaderProps {
  current: any;
  suffix?: string;
  goOneBack: () => void;
  goOneForward: () => void;
}

function SelectorHeader({
  current: currentMonth,
  suffix,
  goOneBack: goOneMonthBack,
  goOneForward: goOneMonthForward,
}: SelectorHeaderProps) {
  const theme = lightTheme;

  return (
    <Container>
      <IconButton onClick={( ) => goOneMonthBack()}>
        <FaChevronLeft size={24} color={theme.TEXT_COLOR} />
      </IconButton>
      <TextContainer>
        <Title>{currentMonth}</Title>
        {suffix && <Subtitle>/{suffix}</Subtitle>}
      </TextContainer>
      <IconButton onClick={( ) => goOneMonthForward()}>
        <FaChevronRight size={24} color={theme.TEXT_COLOR} />
      </IconButton>
    </Container>
  );
}

export default SelectorHeader;
