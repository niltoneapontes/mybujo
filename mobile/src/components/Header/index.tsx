import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  DateComponent,
  DateText,
  HeaderContainer,
  Subtitle,
} from './styles';
import { useTheme } from 'styled-components';
import { Platform, ScrollView } from 'react-native';
import { numDays } from '../../utils/getDaysInMonth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

interface HeaderProps {
  onSelect: React.Dispatch<React.SetStateAction<number>>;
}

function Header({ onSelect }: HeaderProps) {
  const theme = useTheme() as any;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const days = useMemo(() => {
    return Array.from(
      { length: numDays(today.getFullYear(), month) },
      (_, i) => i + 1,
    );
  }, [month, today]);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const scrollViewRef = useRef<ScrollView>(null);
  const isFocused = useIsFocused();

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

    async function getSelectedYear() {
      const selectedYear = await AsyncStorage.getItem('@mybujo/selectedYear');
      if (selectedYear) {
        setYear(Number(selectedYear));
      } else {
        await AsyncStorage.setItem(
          '@mybujo/selectedYear',
          (today.getFullYear() + 1).toString(),
        );
      }
    }

    getSelectedYear();
    getSelectedMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
      <Subtitle>
        {month}/{year}
      </Subtitle>
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
                    onSelect(day);
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
