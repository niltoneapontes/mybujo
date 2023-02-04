import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${props => props.theme.PRIMARY_COLOR};
  align-items: center;
  padding: 64px 12px 12px;
  justify-content: space-around;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.TITLE_COLOR};
`;

export const HeaderButton = styled.TouchableOpacity`
  height: 32px;
  width: 32px;
  background: transparent;
  justify-content: center;
  align-items: center;
`;
