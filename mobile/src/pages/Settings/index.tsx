import React, { useEffect, useState } from 'react';
import {
  Container,
  ContentContainer,
  ProfileContentContainer,
  ProfileDescription,
  ProfileName,
  ProfilePicture,
  SettingsHeader,
} from './styles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Button from '../../components/Button';
import { getUserData } from '../../utils/getUserData';
import { clearUserData } from '../../utils/clearUserData';
import { useNavigation } from '@react-navigation/native';

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
        </ProfileContentContainer>

        <Button
          onPress={() => signOut()}
          text="Sair do aplicativo"
          type="cancel"
        />
      </ContentContainer>
    </Container>
  );
}

export default Settings;
