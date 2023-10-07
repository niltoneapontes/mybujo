import React, { useEffect, useState } from 'react';
import {
  ButtonsContainer,
  Container,
  Disclaimer,
  GoogleButton,
  GoogleButtonText,
  LoginImage,
} from './styles';
import LoginImageSource from '../../../assets/login-background.png';
import GoogleLogo from '../../../assets/google.svg';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const navigation = useNavigation<any>();

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userFromGoogleApi = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      setUser(userFromGoogleApi);
      setTokenInfo(tokens);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.error('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.error('An unexpected error occured');
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email', 'openid'],
      webClientId:
        '383023240379-a922k52n3u9fcr8bboadn3rikqnqidie.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate('BottomTabNavigator');
    }
  }, [user, navigation]);

  return (
    <>
      <Container>
        <LoginImage source={LoginImageSource} />
        <ButtonsContainer>
          <GoogleButton
            onPress={async () => {
              await _signIn();
            }}>
            <GoogleLogo />
            <GoogleButtonText>Login com Google</GoogleButtonText>
          </GoogleButton>
        </ButtonsContainer>

        <Disclaimer>
          Ao acessar utilizando alguma das opções acima, você está concordando
          com os nossos Termos de Uso.
        </Disclaimer>
      </Container>
    </>
  );
}

export default Login;
