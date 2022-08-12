import React from 'react';
import {BlueCircle, Container, OrangeCircle, TextContainer} from './styles';
import Logo from '@assets/logo.svg';

function SplashScreen() {
  return (
    <Container>
      <OrangeCircle
        from={{
          scale: 0,
          translateY: 10,
        }}
        animate={{
          scale: [1, {value: 0, delay: 1000}],
          translateY: [0, {value: 10, delay: 1000}],
        }}
      />
      <BlueCircle
        animate={{
          scale: [
            0,
            1,
            {value: 50, delay: 1000, type: 'timing', duration: 2000},
            {value: 10, delay: 1500},
          ],
          translateY: [
            0,
            0,
            {value: 0, delay: 1000},
            {value: 75, delay: 1500, type: 'timing', duration: 1000},
          ],
        }}
      />
      <TextContainer delay={3000} from={{scale: 0}} animate={{scale: 1.5}}>
        <Logo />
      </TextContainer>
    </Container>
  );
}

export default SplashScreen;
