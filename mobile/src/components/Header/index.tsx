import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Container, DateComponent, DateText, HeaderContainer } from './styles';
import { useTheme } from 'styled-components';
import { Platform, ScrollView } from 'react-native';
import { numDays } from '../../utils/getDaysInMonth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HeaderProps {
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ onSelect }: HeaderProps) {
  const theme = useTheme() as any;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const days = useMemo(() => {
    return Array.from(
      { length: numDays(today.getFullYear(), month) },
      (_, i) => i + 1,
    );
  }, [month, today]);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    async function getSelectedMonth() {
      const selectedMonth = await AsyncStorage.getItem('@mybujo/selectedMonth');
      if (selectedMonth) {
        setMonth(Number(selectedMonth));
      } else {
        await AsyncStorage.setItem(
          '@mybujo/selectedMonth',
          (today.getMonth() + 1).toString(),
        );
      }
    }

    getSelectedMonth();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      scrollViewRef.current?.scrollTo({
        x: (selectedDay - 1) * 78,
        animated: true,
      });
    }
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
                      month,
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
