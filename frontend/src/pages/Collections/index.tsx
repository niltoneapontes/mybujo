import React, { useEffect, useState } from 'react';
import { CollectionText, Container, FooterComponent } from './styles';
import CollectionCard from '../../components/CollectionCard';
import firestore from 'firebase/firestore';
import { User } from '../../models/User';
import { getUserData } from '../../utils/getUserData';
import WrappingView from '../../components/WrappingView';
import { darkTheme, lightTheme } from '../../tokens/colors';
import { Collection } from '../../models/Collection';
import Toast from '../../components/Toast';
import { db } from '../../App';

function Collections() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const theme = lightTheme;
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');

  useEffect(() => {
    getUserData()
      .then(response => setUser(response))
      .catch(error => console.error('Error reading user data: ', error));
  }, []);

  async function getCollections() {
    if (user && user?.id) {
      try {
        const registries = await db
          .collection('Collections')
          .where('userId', '==', user?.id)
          .get();

        if (registries.docs.length > 0) {
          setCollections(
            registries.docs.map(doc => {
              return {
                id: doc.data().id,
                userId: doc.data().userId,
                title: doc.data().title,
                content: doc.data().content,
                updatedAt: doc.data().updatedAt,
              };
            }),
          );
        } else {
          setCollections([]);
        }
      } catch (error) {
        console.error('Error getting collections: ', error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    setLoading(true);

    getCollections();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setLoading(true);
    await getCollections();
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <CollectionText>Suas listas</CollectionText>
        <CollectionCard
          isInput
          collections={collections}
          setCollections={setCollections}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
        {loading ? (
          <WrappingView>
            Carregando...
          </WrappingView>
        ) : (
          <>
          { collections.length > 0 ? collections.map(item => (
            <>
            <CollectionCard
                id={item.id}
                title={item.title}
                content={item.content}
                collections={collections}
                setCollections={setCollections}
                setMessage={setMessage}
                setMessageType={setMessageType}
              />
              <div style={{ height: 12, width: '100%' }} />
              </>
          )) : (<FooterComponent>
          <CollectionText>
            Você ainda não criou nenhuma lista :/
          </CollectionText>
        </FooterComponent>)}
        </>)}
      </Container>
      {message && <Toast text={message} type={messageType} />}
    </>
  );
}

export default Collections;
