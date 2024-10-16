import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ButtonsContainer, Container, Disclaimer, ShareButton } from './styles';
import {
  IconRecord,
  RichEditor,
  RichToolbar,
  actions,
} from '../../../libs/react-native-pell-rich-editor';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import { StyleSheet, ScrollView } from 'react-native';
import { darkTheme, lightTheme } from '../../tokens/colors';
import firestore from '@react-native-firebase/firestore';
import { getUserData } from '../../utils/getUserData';
import { User } from '../../models/User';
import { Future } from '../../models/Future';
import FontFamilyStylesheet from '../../tokens/richtEditor/stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import CopyPasteButton from '../CopyPasteButton';
import { useNavigation } from '@react-navigation/native';

interface FutureInputProps {
  selectedYear: number;
  initHTML: string;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  clearMessage: () => void;
}

function FutureInput({
  selectedYear,
  initHTML,
  setMessage,
  clearMessage,
}: FutureInputProps) {
  const navigation = useNavigation<any>();
  const richText = useRef<RichEditor>(null);
  const scrollRef = useRef<ScrollView>(null);
  const disabled = false;
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout>();
  const [stopedTypingTimer, setStopedTypingTimer] = useState<NodeJS.Timeout>();
  const [disclaimerMessage, setDisclaimerMessage] = useState<string>('');

  const contentRef = useRef(initHTML);
  const fontFamily = 'Inter';

  function createContentStyle() {
    const contentStyle = {
      backgroundColor: theme.BACKGROUND_COLOR,
      color: theme.TEXT_COLOR,
      caretColor: theme.PRIMARY_COLOR,
      placeholderColor: theme.PLACEHOLDER,
      codeBoxColor: theme.CODE_BLOCK,
      initialCSSText: `${FontFamilyStylesheet}`,
      contentCSSText: `font-size: 16px; min-height: 200px; font-family: ${fontFamily};`,
    };
    return contentStyle;
  }

  const contentStyle = useMemo(
    () => createContentStyle(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onInsertLink = useCallback(() => {
    // Do nothing
  }, []);

  const handleHeightChange = useCallback(() => {
    // Do nothing
  }, []);

  const handleForeColor = useCallback(() => {
    richText.current?.setForeColor('blue');
  }, []);

  const handleHaliteColor = useCallback(() => {
    richText.current?.setHiliteColor('red');
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
    clearTimeout(stopedTypingTimer);
    const timeout = setTimeout(
      () => setDisclaimerMessage('Atualizações salvas'),
      3000,
    );
    setStopedTypingTimer(timeout);
  }, [stopedTypingTimer]);

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

  const handleCursorPosition = useCallback((scrollY: number) => {
    // Positioning scroll bar
    scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  const saveText = useCallback(async () => {
    setDisclaimerMessage('Salvando...');
    console.info('Saving Text to Firestore...');
    const monthlyData: Future = {
      userId: user?.id!!,
      content: contentRef.current,
      year: selectedYear.toString(),
      updatedAt: new Date().toISOString(),
    };

    const snapshot = await firestore()
      .collection('Future')
      .where('year', '==', selectedYear.toString())
      .where('userId', '==', user?.id)
      .get();

    if (snapshot.docs.length === 0) {
      firestore().collection('Future').add(monthlyData);
    } else {
      firestore()
        .collection('Future')
        .doc(snapshot.docs[0].id)
        .update({
          content: contentRef.current,
          updatedAt: new Date().toISOString(),
        })
        .then(() => {
          console.info('Yearly updated!');
        });
    }
  }, [selectedYear, user]);

  const handleChange = useCallback(
    (html: string) => {
      contentRef.current = html;
      clearTimeout(typingTimer);
      const timeout = setTimeout(() => saveText(), 1000);
      setTypingTimer(timeout);
    },
    [saveText, typingTimer],
  );

  const editorInitializedCallback = useCallback(() => {
    //Do nothing
  }, []);

  useEffect(() => {
    getUserData()
      .then(response => setUser(response))
      .catch(error => console.error('Error reading user data: ', error));
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        if (user) {
          saveText();
        }
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        if (user) {
          saveText();
        }
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [saveText, user]);

  const shareImage = async () => {
    navigation.navigate('ScreenShot', {
      initHTML: contentRef.current,
      selectedDate: selectedYear,
    });
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    async function getInitHtml() {
      try {
        const registries = await firestore()
          .collection('Future')
          .where('userId', '==', user?.id)
          .where('year', '==', selectedYear.toString())
          .get();

        if (registries.docs.length > 0) {
          contentRef.current = registries.docs[0].get('content')?.toString()!!;
        }
      } catch (error) {
        console.error('Error getting daily: ', error);
      }
    }

    setRefreshing(true);
    if (user) {
      getInitHtml();
    }
    richText.current?.forceUpdate();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [selectedYear, user]);

  return (
    <Container>
      <ScrollView
        style={[
          styles.scroll,
          useColorScheme() === 'dark' && styles.scrollDark,
        ]}
        keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
        ref={scrollRef}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator
        scrollEventThrottle={20}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[lightTheme.PRIMARY_COLOR]}
          />
        }>
        {!refreshing && (
          <RichEditor
            initialFocus={false}
            firstFocusEnd={false}
            disabled={disabled}
            editorStyle={contentStyle}
            ref={richText}
            style={styles.rich}
            useContainer={true}
            enterKeyHint={'go'}
            placeholder={'Planeje o seu ano aqui 📅'}
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
        )}
      </ScrollView>
      <ButtonsContainer>
        <CopyPasteButton
          contentRef={contentRef}
          clearMessage={clearMessage}
          setMessage={setMessage}
          setRefreshing={setRefreshing}
        />
        <ShareButton onPress={shareImage}>
          <FeatherIcons
            name="share"
            size={24}
            color={theme.ACCENT_COLOR_TEXT}
          />
        </ShareButton>
      </ButtonsContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}>
        <Disclaimer>{disclaimerMessage}</Disclaimer>
        <RichToolbar
          style={[
            styles.richBar,
            useColorScheme() === 'dark' && styles.richBarDark,
          ]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          getEditor={richText}
          disabled={disabled}
          iconTint={theme.DARK_TEXT_COLOR}
          selectedIconTint={theme.PRIMARY_COLOR}
          disabledIconTint={'#bfbfbf'}
          onInsertLink={onInsertLink}
          actions={[
            actions.undo,
            actions.redo,
            actions.checkboxList,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.heading4,
            actions.setParagraph,
            actions.setStrikethrough,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,
          ]} // default defaultActions
          iconMap={{
            [actions.setParagraph]: ({ tintColor }: IconRecord) => (
              <Icon name="format-paragraph" size={24} color={tintColor} />
            ),
            [actions.heading4]: ({ tintColor }: IconRecord) => (
              <Icon name="format-title" size={24} color={tintColor} />
            ),
          }}
          foreColor={handleForeColor}
          hiliteColor={handleHaliteColor}
        />
      </KeyboardAvoidingView>
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

export default FutureInput;
