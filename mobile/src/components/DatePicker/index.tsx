import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Modal, FlatList, useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../../tokens/colors';
import { DatePickerItem, DatePickerItemText, ModalContainer } from './styles';

interface DatePickerProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DatePicker = ({ setShow }: DatePickerProps) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>();
  const [selectedYear, setSelectedYear] = useState<number | null>();
  const [showSecondModal, setShowSecondModal] = useState(false);
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  const months = Array.from(
    { length: 12 },
    (_, index) => `${12 - index}`,
  ).reverse();

  const years = Array.from(
    { length: 10 },
    (_, index) => `${2030 - index}`,
  ).reverse();

  const handleMonthSelect = month => {
    setSelectedMonth(month);
    setShowSecondModal(true);
  };

  const handleYearSelect = year => {
    setSelectedYear(year);
  };

  useEffect(() => {
    async function saveMonth() {
      if (selectedMonth) {
        await AsyncStorage.setItem(
          '@mybujo/selectedMonth',
          selectedMonth.toString(),
        );
      }
    }
    saveMonth();
  }, [selectedMonth, setShow]);

  useEffect(() => {
    async function saveYear() {
      if (selectedYear) {
        await AsyncStorage.setItem(
          '@mybujo/selectedYear',
          selectedYear.toString(),
        );
        setShow(false);
      }
    }
    saveYear();
  }, [selectedYear, setShow]);

  const renderPickerItem = ({ item, onPress }) => (
    <DatePickerItem onPress={onPress}>
      <DatePickerItemText>{item}</DatePickerItemText>
    </DatePickerItem>
  );

  return (
    <>
      {!showSecondModal ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible
          onRequestClose={() => setShow(false)}>
          <ModalContainer>
            <FlatList
              data={months}
              renderItem={({ item }) =>
                renderPickerItem({
                  item,
                  onPress: () => handleMonthSelect(item),
                })
              }
              ListHeaderComponent={
                <DatePickerItem>
                  <DatePickerItemText>Selecione o mês</DatePickerItemText>
                </DatePickerItem>
              }
              ListHeaderComponentStyle={{
                borderRadius: 16,
                overflow: 'hidden',
                borderBottomColor: theme.GRAY200,
                borderBottomWidth: 0.5,
                borderBottomEndRadius: 0,
                borderBottomStartRadius: 0,
              }}
              style={{
                backgroundColor: theme.PRIMARY_COLOR_DARKER,
                width: 'auto',
                maxHeight: months.length * 32,
                borderRadius: 16,
              }}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              keyExtractor={item => item}
            />
          </ModalContainer>
        </Modal>
      ) : (
        <Modal
          animationType="slide"
          transparent={true}
          visible
          onRequestClose={() => setShow(false)}>
          <ModalContainer>
            <FlatList
              data={years}
              ListHeaderComponent={
                <DatePickerItem>
                  <DatePickerItemText>Selecione o ano</DatePickerItemText>
                </DatePickerItem>
              }
              ListHeaderComponentStyle={{
                borderRadius: 16,
                overflow: 'hidden',
                borderBottomColor: theme.GRAY200,
                borderBottomWidth: 0.5,
                borderBottomEndRadius: 0,
                borderBottomStartRadius: 0,
              }}
              renderItem={({ item }) =>
                renderPickerItem({
                  item,
                  onPress: () => handleYearSelect(item),
                })
              }
              style={{
                backgroundColor: theme.PRIMARY_COLOR_DARKER,
                width: 'auto',
                maxHeight: years.length * 32,
                borderRadius: 16,
              }}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              keyExtractor={item => item}
            />
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};

export default DatePicker;
