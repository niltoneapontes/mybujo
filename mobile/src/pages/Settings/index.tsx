import React, { useEffect, useState } from 'react';
import {
  Container,
  ContentContainer,
  ProfileContentContainer,
  ProfileDescription,
  ProfileName,
  ProfilePicture,
  SettingsHeader,
  Version,
} from './styles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Button from '../../components/Button';
import { getUserData } from '../../utils/getUserData';
import { clearUserData } from '../../utils/clearUserData';
import { useNavigation } from '@react-navigation/native';
import { Linking, View } from 'react-native';

interface IGoogleUser {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

function Settings() {
  const [user, setUser] = useState<IGoogleUser | undefined>(undefined);
  const navigation = useNavigation<any>();

  const signOut = async () => {
    try {
      clearUserData();
      await GoogleSignin.signOut();
      setUser(undefined);

      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData()
      .then(response => setUser(response))
      .catch(error => console.error('Error reading user data: ', error));
  }, []);

  return (
    <Container>
      <SettingsHeader />
      {user?.photo && <ProfilePicture source={{ uri: user?.photo }} />}
      <ContentContainer>
        <ProfileContentContainer>
          <ProfileName>{user?.name}</ProfileName>
          <ProfileDescription>{user?.email}</ProfileDescription>
          <Button
            onPress={() => {
              navigation.navigate('Collections');
            }}
            text="Suas listas"
            type="action"
          />
          <View style={{ marginBottom: 12 }} />
          <Button
            onPress={() => {
              navigation.navigate('Performance');
            }}
            text="Performance"
            type="action"
          />
          <View style={{ marginBottom: 12 }} />
          <Button
            onPress={() => {
              Linking.openURL('http://privacy.bubblesolutions.com.br/');
            }}
            text="Saiba mais sobre seus dados"
            type="action"
          />
        </ProfileContentContainer>

        <Button
          onPress={() => signOut()}
          text="Sair do aplicativo"
          type="cancel"
        />
        <Version>Versão: 2.4.4</Version>
      </ContentContainer>
    </Container>
  );
}

export default Settings;
