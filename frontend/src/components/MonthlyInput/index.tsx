import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { ButtonsContainer, Container, Disclaimer, ShareButton } from './styles';

import { lightTheme } from '../../tokens/colors';
import { getUserData } from '../../utils/getUserData';
import { User } from '../../models/User';
import {FaShare} from 'react-icons/fa'
import CopyPasteButton from '../CopyPasteButton';

interface MonthlyInputProps {
  selectedDate: string;
  initHTML: string;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  clearMessage: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

function MonthlyInput({
  initHTML,
  setMessage,
  clearMessage,
  setErrorMessage,
}: MonthlyInputProps) {
  const scrollRef = useRef(null);
  const theme = lightTheme;
  const [user, setUser] = useState<User | null>(null);
  const contentRef = useRef(initHTML);
  const [disclaimerMessage, setDisclaimerMessage] = useState<string>('');

  const shareImage = async () => {
    console.log('Capturar tela')
  };

  useEffect(() => {
    getUserData()
      .then(response => setUser(response))
      .catch(error => {
        setErrorMessage('Oops.. Não foi possível ler os dados do usuário');
        clearMessage();
        console.error('Error reading user data: ', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      <Container>
        <div
          style={
            styles.scroll
          }
          ref={scrollRef}
          >
          {!refreshing && (
            <div>
              {initHTML}
            </div>
          )}
        </div>
        <ButtonsContainer>
          <CopyPasteButton
            contentRef={contentRef}
            clearMessage={clearMessage}
            setMessage={setMessage}
            setRefreshing={setRefreshing}
          />
          <ShareButton onClick={shareImage}>
            <FaShare size={24} color={theme.SOFT_WHITE} />
          </ShareButton>
        </ButtonsContainer>
          <Disclaimer>{disclaimerMessage}</Disclaimer>
      </Container>
    </>
  );
}

const styles = {
  scroll: {
    backgroundColor: lightTheme.BACKGROUND_COLOR,
  }
};

export default MonthlyInput;
