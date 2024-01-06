import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Container,
  DateContainer,
  DateText,
  FooterContainer,
  FooterText,
  IconWrapper,
  Title,
} from './styles';
import { RichEditor } from '../../../libs/react-native-pell-rich-editor';
import { useColorScheme } from 'react-native';
import { StyleSheet } from 'react-native';
import { darkTheme, lightTheme } from '../../tokens/colors';

import FontFamilyStylesheet from '../../tokens/richtEditor/stylesheet';
import Logo from '../../../assets/logo_for_screenshot.svg';

import Share from 'react-native-share';
import { captureScreen } from 'react-native-view-shot';
import { useNavigation, useRoute } from '@react-navigation/native';

function ScreenShot(): React.JSX.Element {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const initHtml = route.params?.initHTML || 'No html received';
  const selectedDate = route.params?.selectedDate || 'No date received';

  const richText = useRef<RichEditor>(null);
  const disabled = false;
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout>();
  const contentRef = useRef(initHtml);
  const fontFamily = 'Inter';

  function createContentStyle() {
    const contentStyle = {
      backgroundColor: theme.BACKGROUND_COLOR,
      color: theme.TEXT_COLOR,
      caretColor: theme.PRIMARY_COLOR,
      placeholderColor: theme.PLACEHOLDER,
      initialCSSText: `${FontFamilyStylesheet}`,
      codeBoxColor: theme.CODE_BLOCK,
      contentCSSText: `
      font-size: 16px; 
      min-height: 200px; 
      font-family: ${fontFamily};
      `,
    };
    return contentStyle;
  }

  const contentStyle = useMemo(
    () => createContentStyle(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleHeightChange = useCallback(() => {
    // Do nothing
  }, []);

  const handlePaste = useCallback(() => {
    // Do nothing
  }, []);

  const handleKeyUp = useCallback(() => {
    // Do nothing
  }, []);

  const handleKeyDown = useCallback(() => {
    // Do nothing
  }, []);

  const handleInput = useCallback(() => {
    // Do nothing
  }, []);

  const handleMessage = useCallback(
    ({ type, id, data }: { type: string; id: string; data?: any }) => {
      switch (type) {
        case 'TitleClick':
          const color = ['red', 'blue', 'gray', 'yellow', 'coral'];

          // command: $ = document.querySelector
          richText.current?.commandDOM(
            `$('#${id}').style.color='${
              color[Math.floor(Math.random() * (color.length - 1))]
            }'`,
          );
          break;
        case 'SwitchImage':
          break;
      }
      console.info('onMessage', type, id, data);
    },
    [],
  );

  const handleFocus = useCallback(() => {
    // Do nothing
  }, []);

  const handleBlur = useCallback(async () => {
    // Do nothing
  }, []);

  const handleCursorPosition = useCallback(() => {
    // Positioning scroll bar
  }, []);

  const saveText = useCallback(async () => {
    // Do nothing
  }, []);

  const handleChange = useCallback(
    (html: string) => {
      contentRef.current = html;
      clearTimeout(typingTimer);
      const timeout = setTimeout(() => saveText(), 2000);
      setTypingTimer(timeout);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saveText],
  );

  useEffect(() => {
    const shareImage = () => {
      const timeout = setTimeout(async () => {
        try {
          const uri = await captureScreen({
            format: 'png',
            fileName: 'agenda',
            quality: 0.8,
          });
          await Share.open({ url: uri });
        } catch (e) {
          console.log(e);
        } finally {
          clearTimeout(timeout);
          navigation.goBack();
        }
      }, 2000);
    };

    shareImage();
  }, [navigation]);

  const editorInitializedCallback = useCallback(() => {
    // Do nothing
  }, []);

  return (
    <Container>
      <DateContainer>
        <Title>Hey, isso é o que eu planejei</Title>
      </DateContainer>
      <DateText>
        Data:{' '}
        {selectedDate.length > 5
          ? selectedDate.split('-').reverse().join('/')
          : selectedDate}
      </DateText>
      <RichEditor
        initialFocus={false}
        firstFocusEnd={false}
        disabled={disabled}
        editorStyle={contentStyle}
        ref={richText}
        style={styles.rich}
        useContainer={true}
        enterKeyHint={'go'}
        placeholder={'Planeje o seu dia aqui ✏️'}
        initialContentHTML={contentRef.current}
        editorInitializedCallback={editorInitializedCallback}
        onChange={handleChange}
        onHeightChange={handleHeightChange}
        onPaste={handlePaste}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        onMessage={handleMessage}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onCursorPosition={handleCursorPosition}
        pasteAsPlainText={true}
        autoCorrect
        autoCapitalize="sentences"
      />
      <FooterContainer>
        <FooterText>Feito com MyBujo</FooterText>
        <IconWrapper>
          <Logo width={32} height={32} />
        </IconWrapper>
      </FooterContainer>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.WHITE,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 200,
    padding: 12,
  },
  topVi: {
    backgroundColor: lightTheme.WHITE,
  },
  richBar: {
    borderColor: lightTheme.GRAY200,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    borderColor: lightTheme.GRAY200,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: darkTheme.BACKGROUND_COLOR,
  },
  scroll: {
    backgroundColor: lightTheme.BACKGROUND_COLOR,
  },
  scrollDark: {
    backgroundColor: darkTheme.BACKGROUND_COLOR,
  },
  darkBack: {
    backgroundColor: darkTheme.BACKGROUND_COLOR,
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: lightTheme.WHITE,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
  },

  tib: {
    textAlign: 'center',
    color: lightTheme.WHITE,
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
});

export default ScreenShot;
