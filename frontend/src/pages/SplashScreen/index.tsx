import React from 'react';
import { Container, LogoWrapper } from './styles';
import Logo from '../../../assets/splashlogo.svg';

function SplashScreen() {
  return (
    <Container>
      <LogoWrapper
        from={{
          translateX: -500,
        }}
        animate={{
          translateX: -265,
        }}
        transition={{
          type: 'timing',
          duration: 1000,
        }}>
        <Logo />
      </LogoWrapper>
    </Container>
  );
}

export default SplashScreen;
