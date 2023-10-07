import React from 'react';
import { Container, IconButton, Title } from './styles';
import Icons from 'react-native-vector-icons/Feather';

function SelectorHeader() {
  return (
    <Container>
      <IconButton>
        <Icons name="chevron-left" size={24} />
      </IconButton>
      <Title>Janeiro</Title>
      <IconButton>
        <Icons name="chevron-right" size={24} />
      </IconButton>
    </Container>
  );
}

export default SelectorHeader;
