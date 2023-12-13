import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Container } from './styles';
import {
  FONT_SIZE,
  IconRecord,
  RichEditor,
  RichToolbar,
  actions,
} from 'react-native-pell-rich-editor';
import { Keyboard, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { StyleSheet, ScrollView } from 'react-native';
import { DefaultTheme, useTheme } from 'styled-components';
import { EmojiView } from './emoji';

interface DailyInputProps {
  selectedDate: String;
}

function DailyInput({ selectedDate }: DailyInputProps) {
  const imageList = useMemo(
    () => [
      'https://img.lesmao.vip/k/h256/R/MeiTu/1293.jpg',
      'https://pbs.twimg.com/profile_images/1242293847918391296/6uUsvfJZ.png',
      'https://img.lesmao.vip/k/h256/R/MeiTu/1297.jpg',
      'https://img.lesmao.vip/k/h256/R/MeiTu/1292.jpg',
    ],
    [],
  );
  const initHTML = '';

  console.log(selectedDate);

  const richText = useRef<RichEditor>(null);
  const scrollRef = useRef<ScrollView>(null);
  const contentRef = useRef(initHTML);
  const disabled = false;
  const theme = useTheme();
  const dark = theme === 'dark';
  const [emojiVisible, setEmojiVisible] = useState(false);

  const phizIcon = require('../../../assets/phiz.png');
  const htmlIcon = require('../../../assets/html.png');

  function createContentStyle(_: DefaultTheme) {
    // Can be selected for more situations (cssText or contentCSSText).
    const contentStyle = {
      backgroundColor: '#2e3847',
      color: '#fff',
      caretColor: 'red', // initial valid// initial valid
      placeholderColor: 'gray',
      // cssText: '#editor {background-color: #f3f3f3}', // initial valid
      contentCSSText: 'font-size: 16px; min-height: 200px;', // initial valid
    };
    if (theme === 'light') {
      contentStyle.backgroundColor = '#fff';
      contentStyle.color = '#000033';
      contentStyle.placeholderColor = '#a9a9a9';
    }
    return contentStyle;
  }

  const contentStyle = useMemo(
    () => createContentStyle(theme),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  );

  const onPressAddImage = useCallback(() => {
    // insert URL
    richText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
      'background: gray;',
    );
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
  }, []);

  const onInsertLink = useCallback(() => {
    // this.richText.current?.insertLink('Google', 'http://google.com');
    // linkModal.current?.setModalVisible(true);
  }, []);

  const handleHeightChange = useCallback((height: number) => {
    console.log('editor height change:', height);
  }, []);

  const handleInsertEmoji = useCallback((emoji: string) => {
    richText.current?.insertText(emoji);
    richText.current?.blurContentEditor();
  }, []);

  const handleEmoji = useCallback(() => {
    Keyboard.dismiss();
    richText.current?.blurContentEditor();
    setEmojiVisible(!emojiVisible);
  }, [emojiVisible]);

  const handleInsertVideo = useCallback(() => {
    richText.current?.insertVideo(
      'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4',
      'width: 50%;',
    );
  }, []);

  const handleInsertHTML = useCallback(() => {
    // this.richText.current?.insertHTML(
    //     `<span onclick="alert(2)" style="color: blue; padding:0 10px;" contenteditable="false">HTML</span>`,
    // );
    richText.current?.insertHTML(
      `<div style="padding:10px 0;" contentEditable="false">
                <iframe  width="100%" height="220"  src="https://www.youtube.com/embed/6FrNXgXlCGA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`,
    );
  }, []);

  // const onLinkDone = useCallback(
  //   ({ title, url }: { title?: string; url?: string }) => {
  //     if (title && url) {
  //       richText.current?.insertLink(title, url);
  //     }
  //   },
  //   [],
  // );

  const handleFontSize = useCallback(() => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    let size = [1, 2, 3, 4, 5, 6, 7];
    richText.current?.setFontSize(
      size[Math.floor(Math.random() * 6)] as FONT_SIZE,
    );
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
    // console.log(inputType, data)
  }, []);

  const handleMessage = useCallback(
    ({ type, id, data }: { type: string; id: string; data?: any }) => {
      switch (type) {
        case 'ImgClick':
          richText.current?.commandDOM(
            `$('#${id}').src="${
              imageList[Math.floor(Math.random() * (imageList.length - 1))]
            }"`,
          );
          break;
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
    [imageList],
  );

  const handleFocus = useCallback(() => {
    console.log('editor focus');
  }, []);

  const handleBlur = useCallback(() => {
    console.log('editor blur');
  }, []);

  const handleCursorPosition = useCallback((scrollY: number) => {
    // Positioning scroll bar
    scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  const handleChange = useCallback((html: string) => {
    // save html to content ref;
    contentRef.current = html;
  }, []);

  const editorInitializedCallback = useCallback(() => {
    // richText.current.registerToolbar(function (items) {
    // console.log('Toolbar click, selected items (insert end callback):', items);
    // });
  }, []);

  return (
    <Container>
      <ScrollView
        style={[styles.scroll, dark && styles.scrollDark]}
        keyboardDismissMode={'none'}
        ref={scrollRef}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}>
        <RichEditor
          // initialFocus={true}
          initialFocus={false}
          firstFocusEnd={false}
          disabled={disabled}
          editorStyle={contentStyle} // default light style
          ref={richText}
          style={styles.rich}
          useContainer={true}
          initialHeight={400}
          enterKeyHint={'done'}
          // containerStyle={{borderRadius: 24}}
          placeholder={'please input content'}
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
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <RichToolbar
          style={[styles.richBar, dark && styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          disabled={disabled}
          // iconTint={color}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
          onPressAddImage={onPressAddImage}
          onInsertLink={onInsertLink}
          // iconSize={24}
          // iconGap={10}
          actions={[
            actions.undo,
            actions.redo,
            actions.insertVideo,
            actions.insertImage,
            actions.setStrikethrough,
            // actions.checkboxList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,

            actions.foreColor,
            actions.hiliteColor,
            actions.heading1,
            actions.heading4,
            'insertEmoji',
            'insertHTML',
            'fontSize',
          ]} // default defaultActions
          iconMap={{
            insertEmoji: phizIcon,
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
            [actions.heading1]: ({ tintColor }: IconRecord) => (
              <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
            ),
            [actions.heading4]: ({ tintColor }: IconRecord) => (
              <Text style={[styles.tib, { color: tintColor }]}>H4</Text>
            ),
            insertHTML: htmlIcon,
          }}
          insertEmoji={handleEmoji}
          insertHTML={handleInsertHTML}
          insertVideo={handleInsertVideo}
          fontSize={handleFontSize}
          foreColor={handleForeColor}
          hiliteColor={handleHaliteColor}
        />
        {emojiVisible && <EmojiView onSelect={handleInsertEmoji} />}
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
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ff0000',
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
    borderColor: '#696969',
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

export default DailyInput;
