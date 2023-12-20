import React, { useEffect, useState } from 'react';
import { CollectionText, Container, FooterComponent } from './styles';
import CollectionCard from '../../components/CollectionCard';
import firestore from '@react-native-firebase/firestore';
import { User } from '../../models/User';
import { getUserData } from '../../utils/getUserData';
import WrappingView from '../../components/WrappingView';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  useColorScheme,
} from 'react-native';
import { darkTheme, lightTheme } from '../../tokens/colors';
import { Collection } from '../../models/Collection';
import Toast from '../../components/Toast';

function Collections() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
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
        const registries = await firestore()
          .collection('Collections')
          .where('userId', '==', user?.id)
          .get();

        console.log(registries.docs);

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
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[lightTheme.PRIMARY_COLOR]}
              />
            }
            keyExtractor={item => item.id}
            automaticallyAdjustKeyboardInsets
            data={collections}
            renderItem={({ item }) => (
              <CollectionCard
                id={item.id}
                title={item.title}
                content={item.content}
                collections={collections}
                setCollections={setCollections}
                setMessage={setMessage}
                setMessageType={setMessageType}
              />
            )}
            style={{ flex: 1, width: '100%' }}
            ItemSeparatorComponent={({}) => (
              <View style={{ height: 12, width: '100%' }} />
            )}
            ListHeaderComponentStyle={{ marginBottom: 16 }}
            ListHeaderComponent={
              <CollectionCard
                isInput
                collections={collections}
                setCollections={setCollections}
                setMessage={setMessage}
                setMessageType={setMessageType}
              />
            }
            ListEmptyComponent={
              <FooterComponent>
                <CollectionText>Você ainda não tem collections</CollectionText>
              </FooterComponent>
            }
            ListFooterComponent={
              <>
                {collections.length > 0 && (
                  <FooterComponent>
                    <CollectionText>Não há mais itens</CollectionText>
                  </FooterComponent>
                )}
              </>
            }
          />
        )}
      </Container>
      {message && <Toast text={message} type={messageType} />}
    </>
  );
}

export default Collections;
