import React from 'react';
import {
  Container,
  TutorialText,
  TutorialTitle,
  TutorialSubTitle,
  ButtonContainer,
  TipsWrapper,
} from './styles';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';

function Tutorial() {
  const navigation = useNavigation<any>();

  return (
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
      <TipsWrapper
        showsVerticalScrollIndicator
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 32,
          paddingHorizontal: 24,
        }}>
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
        <TutorialText>- Marque anotações avulsas com hífen "-"</TutorialText>
        <TutorialText>
          - Use a criatividade e aplique emojis como quiser! Um exemplo é
          utilizar 🎁 para lembrar de aniversários
        </TutorialText>
        <TutorialText>
          - Quando você muda o mês ou ano no Monthly e Future logs, essas
          alterações também valem para os outros logs, assim você pode planejar
          a data que quiser
        </TutorialText>
      </TipsWrapper>
      <ButtonContainer>
        <Button
          type="edit"
          text="Continuar"
          onPress={async () => {
            await AsyncStorage.setItem(
              '@mybujo/hasSeenTutorial06012024',
              'true',
            );
            navigation.navigate('BottomTabNavigator');
          }}
        />
      </ButtonContainer>
    </Container>
  );
}

export default Tutorial;
