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
import Button from '../../components/Button';
import { getUserData } from '../../utils/getUserData';
import { clearUserData } from '../../utils/clearUserData';

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

  const signOut = async () => {
    try {
      clearUserData();
      setUser(undefined);

      window.location.href = '/'
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
            onClick={( ) => {
              window.location.href = '/collections'
            }}
            text="Suas listas"
            type="action"
            hasIcon
            iconName="list"
          />
          <div style={{ marginBottom: 12 }} />
          <Button
            onClick={( ) => {
              window.location.href = '/performance'
            }}
            text="Performance"
            type="action"
            hasIcon
            iconName="pie-chart"
          />
          <div style={{ marginBottom: 12 }} />
          <Button
            onClick={( ) => {
              window.open('http://privacy.bubblesolutions.com.br/');
            }}
            text="Saiba mais sobre seus dados"
            type="action"
            hasIcon
            iconName="lock"
          />
        </ProfileContentContainer>

        <Button
          onClick={( ) => signOut()}
          text="Sair do aplicativo"
          type="cancel"
          hasIcon
          iconName="log-out"
        />
        <Version>Versão: 2.5.3</Version>
      </ContentContainer>
    </Container>
  );
}

export default Settings;
