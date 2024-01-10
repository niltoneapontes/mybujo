import React, { useEffect, useState } from 'react';
import {
  Card,
  CloseButton,
  ContentInput,
  DeleteButton,
  TitleInput,
} from './styles';
import { lightTheme } from '../../tokens/colors';
import Button from '../Button';
import { Collection } from '../../models/Collection';
import firestore from 'firebase/firestore';
import { v4 as uuid } from 'uuid'
import { User } from '../../models/User';
import { getUserData } from '../../utils/getUserData';
import WrappingView from '../WrappingView';
import {FaTrash, FaSave} from 'react-icons/fa';

import { db } from '../../App';

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
  const theme = lightTheme;
  const internalId = id ? id : uuid();
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
    const timeout = setTimeout(() => setMessage(null), 6000);
    clearTimeout(timeout);
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
        const snapshot = await db
          .collection('Collections')
          .where('id', '==', internalId)
          .get();

        if (snapshot.docs.length === 0) {
          db
            .collection('Collections')
            .add(createdCollection)
            .then(() => {
              setCollections([...collections, createdCollection]);
              setMessageType('success');
              setMessage('Lista salva');
              clearMessage();
              console.info('Collection added!');
            })
            .catch(error => {
              setMessageType('error');
              setMessage('Oops... Não foi possível salvar a collection.');
              clearMessage();
              console.error('Firestore Error: ', error);
            })
            .finally(() => {
              setTitleInput('');
              setContentInput('');
            });
        } else {
          const foundCollection = await db
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
              setMessage('Lista atualizada');
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

  const handleRemove = async () => {
    const foundCollection = await db
      .collection('Collections')
      .where('id', '==', id)
      .get();

    foundCollection.docs[0].ref
      .delete()
      .then(() => {
        const filteredCollections = collections.filter(item => item.id !== id);
        setCollections([...filteredCollections]);
        setMessageType('error');
        setMessage('Lista removida');
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
        Carregando...
      </WrappingView>
    );
  }

  return (
    <Card>
      <TitleInput
        placeholder="Insira um título..."
        onChange={(value) => setTitleInput(value.target.value)}
        value={titleInput}
        autoCapitalize="sentences"
      />
      <ContentInput
        placeholder="Insira um conteúdo..."
        onChange={(value) => setContentInput(value.target.value)}
        value={contentInput}
        autoCapitalize="sentences"
      />

      {isInput ? (
        <Button type="action" text="Adicionar" onClick={() => handleSave()} />
      ) : (
        <>
          <CloseButton onClick={( ) => handleRemove()}>
            <FaTrash size={24} color={theme.TEXT_COLOR} />
          </CloseButton>

          <DeleteButton onClick={( ) => handleSave()}>
            <FaSave size={24} color={theme.TEXT_COLOR} />
          </DeleteButton>
        </>
      )}
    </Card>
  );
}

export default CollectionCard;
