import React, { useEffect, useState } from 'react';
import {
  Card,
  CloseButton,
  ContentInput,
  DeleteButton,
  TitleInput,
} from './styles';
import { darkTheme, lightTheme } from '../../tokens/colors';
import { ActivityIndicator, useColorScheme } from 'react-native';
import uuid from 'react-native-uuid';
import Button from '../Button';
import { Collection } from '../../models/Collection';
import firestore from '@react-native-firebase/firestore';
import { User } from '../../models/User';
import { getUserData } from '../../utils/getUserData';
import WrappingView from '../WrappingView';
import Icon from 'react-native-vector-icons/Feather';

interface CollectionCardProps {
  id?: string;
  title?: string;
  content?: string;
  isInput?: boolean;
  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setMessageType: React.Dispatch<React.SetStateAction<'success' | 'error'>>;
}

function CollectionCard({
  id,
  title,
  content,
  isInput,
  collections,
  setCollections,
  setMessage,
  setMessageType,
}: CollectionCardProps) {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  const internalId = id ? id : uuid.v4().toString();
  const [titleInput, setTitleInput] = useState(title || '');
  const [contentInput, setContentInput] = useState(content || '');
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
              setCollections([...collections, createdCollection]);
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
              const newCollections = collections.map(item => {
                if (item.id === createdCollection.id) {
                  return createdCollection;
                }
                return item;
              });
              setCollections([...newCollections]);
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
      } finally {
        setTitleInput('');
        setContentInput('');
      }
    }
  };

  const handleRemove = async () => {
    const foundCollection = await firestore()
      .collection('Collections')
      .where('id', '==', id)
      .get();

    foundCollection.docs[0].ref
      .delete()
      .then(() => {
        const filteredCollections = collections.filter(item => item.id !== id);
        setCollections([...filteredCollections]);
        setMessageType('error');
        setMessage('Collection removida');
        clearMessage();
        console.info('Collection deleted!');
      })
      .catch(error => {
        setMessageType('error');
        setMessage('Oops... Não foi possível remover a collection.');
        clearMessage();
        console.error('Firestore Error: ', error);
      });
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
        <>
          <CloseButton onPress={() => handleRemove()}>
            <Icon name="trash" size={24} color={theme.TEXT_COLOR} />
          </CloseButton>

          <DeleteButton onPress={() => handleSave()}>
            <Icon name="save" size={24} color={theme.TEXT_COLOR} />
          </DeleteButton>
        </>
      )}
    </Card>
  );
}

export default CollectionCard;
