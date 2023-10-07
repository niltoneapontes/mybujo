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
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import Button from '../../components/Button';

interface IGoogleUser {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

function Settings({ navigation }) {
  const [user, setUser] = useState<IGoogleUser | undefined>(undefined);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(undefined);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GoogleSignin.getCurrentUser()
      .then(response => setUser(response?.user))
      .catch(error => console.error(error));
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
            onPress={() => navigation.navigate('Collections')}
            text="Collections"
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
