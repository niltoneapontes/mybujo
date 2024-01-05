import React from 'react';
import {
  Container,
  TutorialText,
  TutorialTitle,
  TutorialSubTitle,
  ButtonContainer,
  TipsWrapper,
  ScrollViewWrapper,
} from './styles';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import { ScrollView } from 'react-native';

function Tutorial() {
  const navigation = useNavigation<any>();

  return (
    <ScrollViewWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <MotiView
            from={{ translateY: 1000 }}
            animate={{
              translateY: 0,
            }}
            transition={{ type: 'timing', duration: 1000 }}
            style={{ width: '100%' }}>
            <TutorialTitle>Seja bem vind@ ao MyBujo</TutorialTitle>
          </MotiView>
          <TipsWrapper>
            <TutorialSubTitle>Dicas:</TutorialSubTitle>
            <TutorialText>
              - Suas alterações são salvas automaticamente
            </TutorialText>
            <TutorialText>
              - Marque tarefas com "•" e as risque quando finalizar (você também
              pode utilizar as checkboxes)
            </TutorialText>
            <TutorialText>
              - Marque eventos com listas numeradas por ordem
            </TutorialText>
            <TutorialText>
              - Marque anotações avulsas com hífen "-"
            </TutorialText>
            <TutorialText>
              - Use a criatividade e aplique emojis como quiser! Um exemplo é
              utilizar 🎁 para lembrar de aniversários
            </TutorialText>
            <TutorialText>
              - Quando você muda o mês ou ano no Monthly e Future logs, essas
              alterações também valem para os outros logs, assim você pode
              planejar a data que quiser
            </TutorialText>
          </TipsWrapper>
          <ButtonContainer>
            <Button
              type="cancel"
              text="Continuar"
              onPress={async () => {
                await AsyncStorage.setItem('@mybujo/hasSeenTutorial2', 'true');
                navigation.navigate('BottomTabNavigator');
              }}
            />
          </ButtonContainer>
        </Container>
      </ScrollView>
    </ScrollViewWrapper>
  );
}

export default Tutorial;
