import React, { useEffect, useState } from 'react';
import {
  ButtonsContainer,
  Container,
  Disclaimer,
  DisclaimerLink,
  FacebookButton,
  FacebookButtonText,
  GoogleButton,
  GoogleButtonText,
  LoginImage,
} from './styles';
import LoginImageSource from '../../../assets/loginbackground.png';
import GoogleLogo from '../../../assets/google.svg';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { User } from '../../models/User';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { lightTheme } from '../../tokens/colors';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const navigation = useNavigation<any>();

  const storeData = async (userValue: User) => {
    try {
      await AsyncStorage.setItem('mybujo-user', JSON.stringify(userValue));
    } catch (e) {
      console.error('Error Saving User to Storage: ', e);
    }
  };

  const _signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userFromGoogleApi = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      setUser(userFromGoogleApi);
      setTokenInfo(tokens);

      const { email, familyName, givenName, id, name, photo } =
        userFromGoogleApi.user;

      const userInfo: User = {
        email,
        familyName,
        givenName,
        id,
        name,
        photo,
        metadata: null,
        origin: 'GOOGLE',
        phoneNumber: null,
      };

      storeData(userInfo);

      const snapshot = await firestore()
        .collection('Users')
        .where('id', '==', id.toString())
        .get();

      if (snapshot.docs.length === 0) {
        firestore()
          .collection('Users')
          .add(userInfo)
          .then(() => {
            console.info('User added!');
          })
          .catch(error => console.error('Firestore Error: ', error));
      } else {
        console.info('User already in database');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.error('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.error('An unexpected error occured: ', error);
      }
    }
  };

  async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth().signInWithCredential(facebookCredential);
  }

  const _handleFacebookLogin = async (
    data: FirebaseAuthTypes.UserCredential,
  ) => {
    try {
      console.info('[USER DATA] ', data);

      setUser(data.user);

      setTokenInfo(await AccessToken.getCurrentAccessToken());

      const { displayName, email, metadata, photoURL, phoneNumber, uid } =
        data.user;

      const userInfo: User = {
        email,
        familyName: displayName?.split(' ')[1] || null,
        givenName: displayName?.split(' ')[0] || null,
        id: uid,
        name: displayName,
        photo: photoURL,
        metadata: JSON.stringify(metadata),
        origin: 'FACEBOOK',
        phoneNumber: phoneNumber,
      };

      storeData(userInfo);

      firestore()
        .collection('Users')
        .add(userInfo)
        .then(() => {
          console.info('User added!');
        })
        .catch(error => console.error('Firestore Error: ', error));
    } catch (error) {
      console.error('Error attempting to save user data');
    }
  };

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
              await _signInWithGoogle();
            }}>
            <GoogleLogo />
            <GoogleButtonText>Login com Google</GoogleButtonText>
          </GoogleButton>
          <FacebookButton
            onPress={() =>
              onFacebookButtonPress()
                .then(response => _handleFacebookLogin(response))
                .catch(error => console.error('Facebook Login Error: ', error))
            }>
            <Icon name="facebook" size={24} color={lightTheme.WHITE} />
            <FacebookButtonText>Continue com Facebook</FacebookButtonText>
          </FacebookButton>
        </ButtonsContainer>

        <Disclaimer>
          Ao acessar utilizando alguma das opções acima, você está concordando
          com os nossos
          <DisclaimerLink
            onPress={() => {
              Linking.openURL('https://terms.bubblesolutions.com.br/');
            }}>
            Termos de Uso.
          </DisclaimerLink>
        </Disclaimer>
      </Container>
    </>
  );
}

export default Login;
