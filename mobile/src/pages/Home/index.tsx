import React from 'react';
import {Text} from 'react-native';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import {Container} from './styles';

function Home() {
  return (
    <>
      <Header />
      <Container>
        <SideBar />
      </Container>
    </>
  );
}

export default Home;
