import React from 'react';
import { Container } from './styles';

export default function WrappingView({ children }): React.ReactElement {
  return <Container>{children}</Container>;
}
