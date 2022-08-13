import React from 'react';
import {HeaderButton, HeaderContainer, HeaderTitle} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'styled-components';

function Header() {
  const theme = useTheme() as any;

  return (
    <HeaderContainer>
      <HeaderButton>
        <Icon name="menu" size={30} color={theme.TITLE_COLOR} />
      </HeaderButton>
      <HeaderTitle>Hoje (Qui, 11 de Agosto)</HeaderTitle>
      <HeaderButton>
        <Icon name="person" size={30} color={theme.TITLE_COLOR} />
      </HeaderButton>
    </HeaderContainer>
  );
}

export default Header;
