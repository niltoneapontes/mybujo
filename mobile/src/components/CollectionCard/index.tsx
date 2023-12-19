import React, { useEffect, useState } from 'react';
import { Card, ContentInput, TitleInput } from './styles';
import { darkTheme, lightTheme } from '../../tokens/colors';
import { ActivityIndicator, useColorScheme } from 'react-native';
import uuid from 'react-native-uuid';
import Button from '../Button';
import { Collection } from '../../models/Collection';
import firestore from '@react-native-firebase/firestore';
import Toast from '../Toast';
import { User } from '../../models/User';
import { getUserData } from '../../utils/getUserData';
import WrappingView from '../WrappingView';

interface CollectionCardProps {
  id?: string;
  title?: string;
  content?: string;
  isInput?: boolean;
}

function CollectionCard({ id, title, content, isInput }: CollectionCardProps) {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  const internalId = id ? id : uuid.v4().toString();
  const [titleInput, setTitleInput] = useState(title || '');
  const [contentInput, setContentInput] = useState(content || '');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUserData()
      .then(response => setUser(response))
      .catch(error => console.error('Error reading user data: ', error))
      .finally(() => setLoading(false));
  }, []);

  const clearMessage = () => {
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSave = async () => {
    if (user && user.id) {
      const createdCollection: Collection = {
        id: internalId,
        title: titleInput,
        content: contentInput,
        updatedAt: new Date().toISOString(),
        userId: user?.id,
      };

      try {
        const snapshot = await firestore()
          .collection('Collections')
          .where('id', '==', internalId)
          .get();

        if (snapshot.docs.length === 0) {
          firestore()
            .collection('Collections')
            .add(createdCollection)
            .then(() => {
              setMessageType('success');
              setMessage('Collection salva');
              clearMessage();
              console.info('Collection added!');
            })
            .catch(error => {
              setMessageType('error');
              setMessage('Oops... Não foi possível salvar a collection.');
              clearMessage();
              console.error('Firestore Error: ', error);
            });
        } else {
          const foundCollection = await firestore()
            .collection('Collections')
            .where('id', '==', id)
            .get();

          foundCollection.docs[0].ref
            .update({
              ...createdCollection,
            })
            .then(() => {
              setMessageType('success');
              setMessage('Collection atualizada');
              clearMessage();
              console.info('Collection updated!');
            })
            .catch(error => {
              setMessageType('error');
              setMessage('Oops... Não foi possível atualizar a collection.');
              clearMessage();
              console.error('Firestore Error: ', error);
            });
        }
      } catch {
        error => {
          setMessageType('error');
          setMessage('Oops... Não foi possível salvar a collection.');
          clearMessage();
          console.error('Firestore Error: ', error);
        };
      }
    }
  };

  if (loading) {
    return (
      <WrappingView>
        <ActivityIndicator
          size={'large'}
          animating
          color={lightTheme.PRIMARY_COLOR}
        />
      </WrappingView>
    );
  }

  return (
    <Card>
      <TitleInput
        placeholder="Insira um título..."
        placeholderTextColor={theme.PLACEHOLDER}
        onChangeText={setTitleInput}
        value={titleInput}
        multiline
        numberOfLines={2}
        autoCorrect
        autoCapitalize="sentences"
      />
      <ContentInput
        placeholder="Insira um conteúdo..."
        placeholderTextColor={theme.PLACEHOLDER}
        onChangeText={setContentInput}
        multiline
        value={contentInput}
        autoCorrect
        autoCapitalize="sentences"
      />

      {isInput ? (
        <Button type="action" text="Adicionar" onPress={() => handleSave()} />
      ) : (
        <Button type="edit" text="Editar" onPress={() => handleSave()} />
      )}
      {message && <Toast text={message} type={messageType} />}
    </Card>
  );
}

export default CollectionCard;
