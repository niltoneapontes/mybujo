import React, { useEffect, useState } from 'react';

import { User } from '../../models/User';
import Toast from '../../components/Toast';
import { GoogleAuthProvider, UserCredential, getAuth, signInWithCredential, signInWithPopup } from 'firebase/auth'
import { db } from '../../App';
import LoginImageSource from '../../assets/loginbackground.png'
import GoogleLogo from '../../assets/google.svg'
import { ButtonsContainer, Container, Disclaimer, DisclaimerLink, GoogleButton, GoogleButtonText, LoginImage } from './styles';

function Login() {
  const [userLocal, setUserLocal] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);
  const googleProvider = new GoogleAuthProvider()

  const clearMessage = () => {
    const timeout = setTimeout(() => setMessage(null), 6000);
    clearTimeout(timeout);
  };

  const storeData = async (userValue: User) => {
    try {
      await localStorage.setItem(
        '@mybujo/user-prod-v253',
        JSON.stringify(userValue),
      );
    } catch (e) {
      setMessage('Oops... Não foi possível se conectar ao servidor.');
      clearMessage();
      console.error('Error Saving User to Storage: ', e);
    }
  };

  async function onGoogleButtonPress() {
    let loggedUser: User

    signInWithPopup(getAuth(), googleProvider)
  .then((result: UserCredential) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    signInWithCredential(getAuth(), credential!!)
    const token = credential?.accessToken;
    setTokenInfo(token)
    const user = result.user;

    loggedUser = {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      familyName: user.displayName?.split(" ")[user.displayName.length - 1]!!,
      givenName: user.displayName?.split(" ")[0]!!,
      metadata: JSON.stringify(user.metadata),
      origin: 'GOOGLE',
      phoneNumber: user.phoneNumber,
      photo: user.photoURL
    }

    setUserLocal(loggedUser)
    storeData(loggedUser)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }).finally(() => {
    return loggedUser;
  });
  }

  useEffect(() => {
    const _signInWithGoogle = async () => {
      const {
        email,
        givenName,
        familyName,
        name,
        metadata,
        photo,
        phoneNumber,
        id,
      } = userLocal;

      const signedUserInfo: User = {
        email,
        familyName,
        givenName,
        id: id,
        name: name,
        photo: photo,
        metadata: JSON.stringify(metadata),
        origin: 'GOOGLE',
        phoneNumber: phoneNumber,
      };

      try {
        const snapshot = await
          db.collection('Users')
          .where('id', '==', signedUserInfo.id.toString())
          .get();

        if (snapshot.docs.length === 0) {
          db.collection('Users')
            .add(signedUserInfo)
            .then(() => {
              console.info('User added!');
            })
            .catch(error => {
              setMessage(
                'Oops... Não foi possível se conectar ao banco de dados.',
              );
              clearMessage();
              console.error('Firestore Error: ', error);
            });
        } else {
          console.info('User already in database');
        }
      } catch (error: any) {
        setMessage('Oops... Não foi possível fazer login com o Google.');
        clearMessage();
      }
    };
    _signInWithGoogle()
  }, [userLocal])

  // async function onFacebookButtonPress() {
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     'email',
  //   ]);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   const facebookCredential = auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );

  //   return auth().signInWithCredential(facebookCredential);
  // }

  // const _handleFacebookLogin = async (
  //   data: FirebaseAuthTypes.UserCredential,
  // ) => {
  //   try {
  //     console.info('[USER DATA] ', data);

  //     setUserLocal(data.user);

  //     setTokenInfo(await AccessToken.getCurrentAccessToken());

  //     const { displayName, email, metadata, photoURL, phoneNumber, uid } =
  //       data.user;

  //     const userInfo: User = {
  //       email,
  //       familyName: displayName?.split(' ')[1] || null,
  //       givenName: displayName?.split(' ')[0] || null,
  //       id: uid,
  //       name: displayName,
  //       photo: photoURL,
  //       metadata: JSON.stringify(metadata),
  //       origin: 'FACEBOOK',
  //       phoneNumber: phoneNumber,
  //     };

  //     storeData(userInfo);

  //     const snapshot = await
  //       .collection('Users')
  //       .where('id', '==', userInfo.id.toString())
  //       .get();

  //     if (snapshot.docs.length === 0) {

  //         .collection('Users')
  //         .add(userInfo)
  //         .then(() => {
  //           console.info('User added!');
  //         })
  //         .catch(error => {
  //           setMessage(
  //             'Oops... Não foi possível se conectar ao banco de dados.',
  //           );
  //           clearMessage();
  //           console.error('Firestore Error: ', error);
  //         });
  //     } else {
  //       console.info('User already in database');
  //     }
  //   } catch (error) {
  //     setMessage('Oops... Não foi possível fazer login com o Google.');
  //     clearMessage();
  //   }
  // };

  useEffect(() => {
    if (userLocal) {
      window.location.href = "home"
    }
  }, [userLocal]);

  return (
    <>
      <Container>
        <LoginImage src={LoginImageSource} />
        <ButtonsContainer>
          <GoogleButton
            onClick={async () => {
              await onGoogleButtonPress();
            }}>
            <GoogleLogo />
            <GoogleButtonText>Login com Google</GoogleButtonText>
          </GoogleButton>
          {/* <FacebookButton
            onClick={( ) =>
              onFacebookButtonPress()
                .then(response => _handleFacebookLogin(response))
                .catch(error => {
                  setMessage('Oops... Não foi possível logar com o Facebook.');
                  clearMessage();
                  console.error('Facebook Login Error: ', error);
                })
            }>
            <Icon name="facebook" size={24} color={lightTheme.WHITE} />
            <FacebookButtonText>Continue com Facebook</FacebookButtonText>
          </FacebookButton> */}
        </ButtonsContainer>

        <Disclaimer>
          Ao acessar utilizando alguma das opções acima, você está concordando
          com os nossos{' '}
          <DisclaimerLink
            href="http://terms.bubblesolutions.com.br/" target='_blank'>
            Termos de Uso.
          </DisclaimerLink>
        </Disclaimer>
      </Container>
      {message && <Toast text={message} type="error" />}
    </>
  );
}

export default Login;
