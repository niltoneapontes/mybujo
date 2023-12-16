import React from 'react';
import {
  Container,
  TutorialText,
  TutorialTitle,
  TutorialSubTitle,
  ButtonContainer,
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
        style={{ flex: 1, width: '100%' }}>
        <TutorialTitle>Seja bem vind@ ao MyBujo</TutorialTitle>
        <TutorialSubTitle>Dicas:</TutorialSubTitle>
        <TutorialText>
          - Suas alterações são salvas automaticamente
        </TutorialText>
        <TutorialText>
          - Marque tarefas com "•" e as risque quando finalizar
        </TutorialText>
        <TutorialText>
          - Marque eventos com listas numeradas por ordem
        </TutorialText>
        <TutorialText>- Marque anotações avulsas com hífen "-"</TutorialText>
        <TutorialText>
          - Use a criatividade e aplique emojis como quiser! Um exemplo é
          utilizar 🎁 para lembrar de aniversários
        </TutorialText>
        <ButtonContainer>
          <Button
            type="cancel"
            text="Continuar"
            onPress={async () => {
              await AsyncStorage.setItem('@mybujo/hasSeenTutorial', 'true');
              navigation.navigate('BottomTabNavigator');
            }}
          />
        </ButtonContainer>
      </MotiView>
    </Container>
  );
}

export default Tutorial;
