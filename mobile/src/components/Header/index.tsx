import React, { useEffect, useRef, useState } from 'react';
import { Container, DateComponent, DateText, HeaderContainer } from './styles';
import { useTheme } from 'styled-components';
import { ScrollView } from 'react-native';

interface HeaderProps {
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ onSelect }: HeaderProps) {
  const theme = useTheme() as any;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: (selectedDay - 1) * 78,
      animated: true,
    });
  }, [selectedDay]);

  return (
    <Container>
      <HeaderContainer
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        theme={theme}>
        {selectedDay && (
          <>
            {days.map(day => {
              return (
                <DateComponent
                  isSelected={day === selectedDay}
                  key={Math.random().toString()}
                  onPress={() => {
                    const selectedDate = new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      day,
                    )
                      .toISOString()
                      .split('T')[0];
                    onSelect(selectedDate);
                    setSelectedDay(day);
                  }}>
                  <DateText isSelected={day === selectedDay}>{day}</DateText>
                </DateComponent>
              );
            })}
          </>
        )}
      </HeaderContainer>
    </Container>
  );
}

export default Header;
