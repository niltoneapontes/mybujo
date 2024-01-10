import React, { useEffect, useState } from 'react';
import { lightTheme } from '../../tokens/colors';
import { DatePickerItem, DatePickerItemText, ModalContainer, Positioner } from './styles';

interface DatePickerProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DatePicker = ({ setShow }: DatePickerProps) => {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState<number | null>();
  const [selectedYear, setSelectedYear] = useState<number | null>();
  const [showSecondModal, setShowSecondModal] = useState(false);
  const theme = lightTheme;

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
        await localStorage.setItem(
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
        await localStorage.setItem(
          '@mybujo/selectedYear',
          selectedYear.toString(),
        );
        setShow(false);
      }
    }
    saveYear();
  }, [selectedYear, setShow]);

  const renderPickerItem = ({ item, onPress }) => (
    <DatePickerItem onClick={onPress}>
      <DatePickerItemText>{item}</DatePickerItemText>
    </DatePickerItem>
  );

  return (
    <>
      {!showSecondModal ? (
        <Positioner>
          <ModalContainer>
          <DatePickerItem>
                  <DatePickerItemText>Selecione o mês</DatePickerItemText>
                </DatePickerItem>
            {months.length > 0 && (

              months.map(item => (
                renderPickerItem({
                  item,
                  onPress: () => handleMonthSelect(item),
                })
              ))
            )}
            </ModalContainer>
        </Positioner>
      ) : (
        <Positioner>
          <ModalContainer>
          <DatePickerItem>
                  <DatePickerItemText>Selecione o ano</DatePickerItemText>
                </DatePickerItem>
            {years.length > 0 && (

              years.map(item => (
                renderPickerItem({
                  item,
                  onPress: () => handleYearSelect(item),
                })
              ))
            )}
            </ModalContainer>
        </Positioner>
      )}
    </>
  );
};

export default DatePicker;
