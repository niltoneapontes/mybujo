import React from 'react';
import { Container, Date, DateText, HeaderContainer } from './styles';
import { useTheme } from 'styled-components';

function Header() {
  const theme = useTheme() as any;
  const days = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Container>
      <HeaderContainer
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        theme={theme}>
        {days.map(day => (
          <Date>
            <DateText>{day}</DateText>
          </Date>
        ))}
      </HeaderContainer>
    </Container>
  );
}

export default Header;
