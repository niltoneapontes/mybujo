import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  ExplainingText,
  GeneralWrapper,
  LabelRectangle,
  LabelText,
  LabelWrapper,
} from './styles';
import SimpleHeader from '../../components/SimpleHeader';
import { VictoryPie } from 'victory-native';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../../tokens/colors';
import firestore from '@react-native-firebase/firestore';
import { User } from '../../models/User';
import { getUserData } from '../../utils/getUserData';
import { numDays } from '../../utils/getDaysInMonth';

function Performance() {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  const [user, setUser] = useState<User>();
  const today = useMemo(() => {
    return new Date();
  }, []);
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const days = useMemo(() => {
    return Array.from(
      { length: numDays(today.getFullYear(), month) },
      (_, i) => i + 1,
    );
  }, [month, today]);

  const [plannedDays, setPlannedDays] = useState(0);
  const [data, setData] = useState([
    { x: 'Planejados', y: 0 },
    { x: 'Não Planejados', y: days.length },
  ]);

  useEffect(() => {
    getUserData()
      .then(response => setUser(response))
      .catch(error => console.error('Error reading user data: ', error));
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const snapshot = await firestore()
          .collection('Daily')
          .where('userId', '==', user?.id)
          .get();

        const numberOfPlannedDays = snapshot.docs.map(doc => {
          if (doc.data().date.includes('2023-12')) {
            return doc;
          }
        }).length;

        setPlannedDays(numberOfPlannedDays);

        setData([
          { x: 'Planejados', y: numberOfPlannedDays },
          { x: 'Não Planejados', y: days.length - numberOfPlannedDays },
        ]);
      } catch (error) {
        console.error('Erro ao buscar performance');
      }
    }

    if (user && user?.id) {
      getData();
    }
  }, [today, user]);

  return (
    <Container>
      <SimpleHeader text="Performance" />
      <VictoryPie
        data={data}
        colorScale={[theme.PRIMARY_COLOR, theme.ERROR_COLOR]} // Custom colors for the pie slices
        width={320} // Width of the pie chart
        height={320} // Height of the pie chart
        innerRadius={40} // Inner radius (for donut-style chart)
        animate
        style={{
          labels: {
            opacity: 0,
          },
        }}
        // Other props and configurations can be added as needed
      />
      <GeneralWrapper>
        <LabelWrapper>
          <LabelRectangle color={theme.PRIMARY_COLOR} />
          <LabelText>Dias planejados</LabelText>
        </LabelWrapper>
        <LabelWrapper>
          <LabelRectangle color={theme.ERROR_COLOR} />
          <LabelText>Dias não planejados</LabelText>
        </LabelWrapper>
      </GeneralWrapper>

      <ExplainingText>
        Você planejou {plannedDays} dias desse mês. Planejar os seus dias
        diminui a ansiedade e aumenta a produtividade.{' '}
        {plannedDays > 20
          ? 'Continue assim e parabéns pela organização 🥳'
          : 'Vamos nos organizar mais? 🤓'}
      </ExplainingText>
    </Container>
  );
}

export default Performance;
