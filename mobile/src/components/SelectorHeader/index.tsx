import React from 'react';
import {
  Container,
  IconButton,
  Subtitle,
  TextContainer,
  Title,
} from './styles';
import Icons from 'react-native-vector-icons/Feather';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../../tokens/colors';

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
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <Container>
      <IconButton onPress={() => goOneMonthBack()}>
        <Icons name="chevron-left" size={24} color={theme.TEXT_COLOR} />
      </IconButton>
      <TextContainer>
        <Title>{currentMonth}</Title>
        {suffix && <Subtitle>/{suffix}</Subtitle>}
      </TextContainer>
      <IconButton onPress={() => goOneMonthForward()}>
        <Icons name="chevron-right" size={24} color={theme.TEXT_COLOR} />
      </IconButton>
    </Container>
  );
}

export default SelectorHeader;
