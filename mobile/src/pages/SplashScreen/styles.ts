import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { darkTheme } from '../../tokens/colors';
import { MotiView } from 'moti';

// @ts-ignore
export const Container = styled(LinearGradient).attrs({
  colors: [
    darkTheme.BACKGROUND_GRADIENT_START,
    darkTheme.BACKGEOUND_GRADIENT_END,
  ],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0.5 },
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// @ts-ignore
export const LogoWrapper = styled(MotiView)``;

export const VersionText = styled.Text`
  font-size: 10px;
  color: ${darkTheme.WHITE};
  position: absolute;
  bottom: 4px;
  right: 8px;
`;
