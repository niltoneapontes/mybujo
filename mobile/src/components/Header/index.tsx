import React from 'react';
import { Container, DateComponent, DateText, HeaderContainer } from './styles';
import { useTheme } from 'styled-components';

interface HeaderProps {
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ onSelect }: HeaderProps) {
  const theme = useTheme() as any;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date();

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
          <DateComponent
            key={Math.random().toString()}
            onPress={() => {
              const selectedDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                day,
              );
              onSelect(selectedDate.toISOString());
            }}>
            <DateText>{day}</DateText>
          </DateComponent>
        ))}
      </HeaderContainer>
    </Container>
  );
}

export default Header;
