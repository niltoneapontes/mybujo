import styled from 'styled-components';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.div`
  height: 124px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow: scroll;
  padding: 0.25rem;
  background-color: ${(props: any) => lightTheme.TAB_BAR};
  z-index: 1;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
`;

export const DateComponent = styled.button`
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  margin: 0 0.3rem;
  background-color: ${(props: any) =>
    props.isselected ? lightTheme.PRIMARY_COLOR : lightTheme.GRAY400};
`;

export const DateText = styled.p`
  font-size: 1.5rem;
  font-family: 'Inter', sans-serif;
  color: ${(props: any) =>
    props.isselected ? lightTheme.WHITE : lightTheme.DARK_TEXT_COLOR};
`;

export const SubtitleButton = styled.button`
  flex-direction: row;
  background-color: ${(props: any) => lightTheme.PRIMARY_COLOR};
  align-self: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 8px;
  margin-top: 8px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  color: ${(props: any) => lightTheme.WHITE};
  margin-right: 4px;
`;
