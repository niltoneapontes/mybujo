import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  DateComponent,
  DateText,
  HeaderContainer,
  Subtitle,
  SubtitleButton,
} from './styles';
import { useTheme } from 'styled-components';
import { numDays } from '../../utils/getDaysInMonth';

import Icon from 'react-icons/fa';

interface HeaderProps {
  onSelect: React.Dispatch<React.SetStateAction<number>>;
  onShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: string;
}

function Header({ onSelect, onShowDatePicker, selectedDate }: HeaderProps) {
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
  const scrollViewRef = useRef(null);

  useEffect(() => {
    async function getSelectedMonth() {
      try {
        const selectedMonth = await localStorage.getItem(
          '@mybujo/selectedMonth',
        );
        if (selectedMonth) {
          setMonth(Number(selectedMonth));
        } else {
          await localStorage.setItem(
            '@mybujo/selectedMonth',
            (today.getMonth() + 1).toString(),
          );
        }
      } catch (error) {
        console.error('GetMonth Error: ', error);
      }
    }

    async function getSelectedYear() {
      try {
        const selectedYear = await localStorage.getItem('@mybujo/selectedYear');
        if (selectedYear) {
          setYear(Number(selectedYear));
        } else {
          await localStorage.setItem(
            '@mybujo/selectedYear',
            today.getFullYear().toString(),
          );
        }
      } catch (error) {
        console.error('GetYear Error: ', error);
      }
    }

    getSelectedYear();
    getSelectedMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, selectedDate]);

  return (
    <Container>
      <SubtitleButton onClick={( ) => onShowDatePicker(true)}>
        <Subtitle>
          {month}/{year}
        </Subtitle>
        <Icon
          name="chevron-down"
          size={18}
          color={theme.WHITE}
          style={{ alignSelf: 'center' }}
        />
      </SubtitleButton>
      <HeaderContainer
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        ref={scrollViewRef}
        theme={theme}>
        {selectedDay && (
          <>
            {days.map(day => {
              return (
                <DateComponent
                  isSelected={day === selectedDay}
                  key={Math.random().toString()}
                  onClick={( ) => {
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
