import React from 'react';
import {HeaderButton, HeaderContainer, HeaderTitle} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Header() {
  return (
    <HeaderContainer>
      <HeaderButton>
        <Icon name="menu" size={30} color="#F6F6F6" />
      </HeaderButton>
      <HeaderTitle>Hoje (Qui, 11 de Agosto)</HeaderTitle>
      <HeaderButton>
        <Icon name="person" size={30} color="#F6F6F6" />
      </HeaderButton>
    </HeaderContainer>
  );
}

export default Header;
