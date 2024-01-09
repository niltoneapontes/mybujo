import { Container, ToastText, Wrapper } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { lightTheme } from '../../tokens/colors';

interface ToastProps {
  text: string;
  type?: 'success' | 'error';
}

function Toast({ text, type }: ToastProps) {
  return (
    <h1>
      <Container type={type}>
        <Wrapper>
          <Icon name="info" size={24} color={lightTheme.WHITE} />
          <ToastText multiline>{text}</ToastText>
        </Wrapper>
      </Container>
    </h1>
  );
}

export default Toast;
