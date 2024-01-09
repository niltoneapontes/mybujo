import React from 'react';
import { Container, IconButton, TextContainer, Title } from './styles';
import Icons from 'react-native-vector-icons/Feather';
import { darkTheme, lightTheme } from '../../tokens/colors';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface SimpleHeaderProps {
  text: any;
}

function SimpleHeader({ text }: SimpleHeaderProps) {
  const theme = lightTheme;
  const navigation = useNavigation<any>();

  return (
    <Container>
      <IconButton onClick={( ) => navigation.goBack()}>
        <Icons name="chevron-left" size={24} color={theme.TEXT_COLOR} />
      </IconButton>
      <TextContainer>
        <Title>{text}</Title>
      </TextContainer>
      <IconButton onClick={( ) => navigation.goBack()} />
    </Container>
  );
}

export default SimpleHeader;
