import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Container } from './styles';
import {
  IconRecord,
  RichEditor,
  RichToolbar,
  actions,
} from 'react-native-pell-rich-editor';
import { Keyboard, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { StyleSheet, ScrollView } from 'react-native';
import { DefaultTheme, useTheme } from 'styled-components';
import { lightTheme } from '../../tokens/colors';
import firestore from '@react-native-firebase/firestore';
import { getUserData } from '../../utils/getUserData';
import { User } from '../../models/User';
import { Future } from '../../models/Future';
import FontFamilyStylesheet from '../../tokens/richtEditor/stylesheet';

interface FutureInputProps {
  selectedYear: number;
  initHTML: string;
}

function FutureInput({ selectedYear, initHTML }: FutureInputProps) {
  console.log(selectedYear);

  const richText = useRef<RichEditor>(null);
  const scrollRef = useRef<ScrollView>(null);
  const disabled = false;
  const theme = useTheme();
  const dark = theme === 'dark';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const contentRef = useRef(initHTML);
  const fontFamily = 'Inter';

  function createContentStyle(_: DefaultTheme) {
    const contentStyle = {
      backgroundColor: lightTheme.WHITE,
      color: lightTheme.TEXT_COLOR,
      caretColor: lightTheme.PRIMARY_COLOR,
      placeholderColor: lightTheme.PLACEHOLDER,
      initialCSSText: `${FontFamilyStylesheet}`,
      contentCSSText: `font-size: 16px; min-height: 200px; font-family: ${fontFamily}`,
    };
    if (theme === 'light') {
      contentStyle.backgroundColor = lightTheme.WHITE;
      contentStyle.color = lightTheme.TEXT_COLOR;
      contentStyle.placeholderColor = lightTheme.PLACEHOLDER;
    }
    return contentStyle;
  }

  const contentStyle = useMemo(
    () => createContentStyle(theme),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  );
  const onInsertLink = useCallback(() => {
    // this.richText.current?.insertLink('Google', 'http://google.com');
    // linkModal.current?.setModalVisible(true);
  }, []);

  const handleHeightChange = useCallback((height: number) => {
    console.log('editor height change:', height);
  }, []);

  const handleForeColor = useCallback(() => {
    richText.current?.setForeColor('blue');
  }, []);

  const handleHaliteColor = useCallback(() => {
    richText.current?.setHiliteColor('red');
  }, []);

  const handlePaste = useCallback((data: any) => {
    console.log('Paste:', data);
  }, []);

  // @deprecated Android keyCode 229
  const handleKeyUp = useCallback(() => {
    // console.log('KeyUp:', data);
  }, []);

  // @deprecated Android keyCode 229
  const handleKeyDown = useCallback(() => {
    // console.log('KeyDown:', data);
  }, []);

  const handleInput = useCallback(() => {
    // console.log(inputType, data);
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
      console.log('onMessage', type, id, data);
    },
    [],
  );

  const handleFocus = useCallback(() => {
    console.log('editor focus');
  }, []);

  const handleBlur = useCallback(async () => {
    console.log('editor blur');
  }, []);

  const handleCursorPosition = useCallback((scrollY: number) => {
    // Positioning scroll bar
    scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  const handleChange = useCallback((html: string) => {
    // save html to content ref;
    console.log(html);
    contentRef.current = html;
  }, []);

  const saveText = useCallback(async () => {
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
          console.log('Yearly updated!');
        });
    }
  }, [selectedYear, user]);

  const editorInitializedCallback = useCallback(() => {
    // richText.current.registerToolbar(function (items) {
    // console.log('Toolbar click, selected items (insert end callback):', items);
    // });
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

  return (
    <Container>
      <ScrollView
        style={[styles.scroll, dark && styles.scrollDark]}
        keyboardDismissMode={'on-drag'}
        ref={scrollRef}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator
        scrollEventThrottle={20}>
        <RichEditor
          initialFocus={false}
          firstFocusEnd={false}
          disabled={disabled}
          editorStyle={contentStyle}
          ref={richText}
          style={styles.rich}
          useContainer={true}
          enterKeyHint={'done'}
          placeholder={'Planeje o seu ano aqui 📅'}
          initialContentHTML={initHTML}
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
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}>
        <RichToolbar
          style={[styles.richBar, dark && styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          disabled={disabled}
          iconTint={lightTheme.DARK_TEXT_COLOR}
          selectedIconTint={lightTheme.PRIMARY_COLOR}
          disabledIconTint={'#bfbfbf'}
          onInsertLink={onInsertLink}
          actions={[
            actions.undo,
            actions.redo,
            actions.setStrikethrough,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,
            actions.heading4,
            actions.setParagraph,
          ]} // default defaultActions
          iconMap={{
            [actions.foreColor]: () => (
              <Text style={[styles.tib, { color: 'blue' }]}>FC</Text>
            ),
            [actions.hiliteColor]: ({ tintColor }: IconRecord) => (
              <Text
                style={[
                  styles.tib,
                  { color: tintColor, backgroundColor: 'red' },
                ]}>
                BC
              </Text>
            ),
            [actions.heading4]: ({ tintColor }: IconRecord) => (
              <Text style={[styles.tib, { color: tintColor }]}>h4</Text>
            ),
            [actions.setParagraph]: ({ tintColor }: IconRecord) => (
              <Text style={[styles.tib, { color: tintColor }]}>p</Text>
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
    backgroundColor: '#efefef',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 120,
    padding: 12,
  },
  topVi: {
    backgroundColor: '#fafafa',
  },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: '#191d20',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  scrollDark: {
    backgroundColor: '#2e3847',
  },
  darkBack: {
    backgroundColor: '#191d20',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
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
    color: '#515156',
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
});

export default FutureInput;
