import React from 'react';
import { Card, ContentInput, TitleInput } from './styles';
import { darkTheme, lightTheme } from '../../tokens/colors';
import { useColorScheme } from 'react-native';

interface CollectionCardProps {
  id?: string;
  title?: string;
  content?: string;
}

function CollectionCard({ id, title, content }: CollectionCardProps) {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <Card key={id}>
      <TitleInput
        placeholder="Insira um título..."
        placeholderTextColor={theme.PLACEHOLDER}
        onChange={() => {}}
        defaultValue={title}
        multiline
        numberOfLines={2}
        autoCorrect
        autoCapitalize="sentences"
      />
      <ContentInput
        placeholder="Insira um conteúdo..."
        placeholderTextColor={theme.PLACEHOLDER}
        onChange={() => {}}
        multiline
        defaultValue={content}
        autoCorrect
        autoCapitalize="sentences"
      />
    </Card>
  );
}

export default CollectionCard;
