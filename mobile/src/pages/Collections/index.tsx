import React, { useEffect, useState } from 'react';
import { CollectionText, Container } from './styles';
import CollectionCard from '../../components/CollectionCard';
import firestore from '@react-native-firebase/firestore';
import { User } from '../../models/User';
import { getUserData } from '../../utils/getUserData';
import WrappingView from '../../components/WrappingView';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../../tokens/colors';
import { Collection } from '../../models/Collection';

function Collections() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    setLoading(true);
    getUserData()
      .then(response => setUser(response))
      .catch(error => console.error('Error reading user data: ', error));
  }, []);

  useEffect(() => {
    setLoading(true);
    async function getInitHtml() {
      try {
        const registries = await firestore()
          .collection('Collections')
          .where('userId', '==', user?.id)
          .get();

        if (registries.docs.length > 0) {
          setCollections(JSON.parse(registries.docs.toString()));
        } else {
          setCollections([]);
        }
      } catch (error) {
        console.error('Error getting collections: ', error);
      } finally {
        setLoading(false);
      }
    }

    if (user && user?.id) {
      getInitHtml();
    }
  }, [user]);

  return (
    <Container>
      <CollectionText>Collections</CollectionText>
      {loading ? (
        <WrappingView>
          <ActivityIndicator
            size={'large'}
            animating
            color={theme.PRIMARY_COLOR}
          />
        </WrappingView>
      ) : (
        <>
          {collections.map(collection => (
            <CollectionCard
              id={collection.id}
              title={collection.title}
              content={collection.content}
            />
          ))}
          <CollectionCard />
        </>
      )}
    </Container>
  );
}

export default Collections;
