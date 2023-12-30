import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props: any) => props.theme.BACKGROUND_COLOR};
`;

export const GeneralWrapper = styled.View`
  align-items: flex-start;
  justify-content: center;
`;

export const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const LabelRectangle = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${(props: any) => props.color};
  margin-right: 8px;
`;

export const LabelText = styled.Text`
  font-size: 16px;
  font-family: 'Inter-SemiBold';
  text-align: left;
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;

export const ExplainingText = styled.Text`
  width: 90%;
  margin-top: 32px;
  font-size: 24px;
  font-family: 'Inter-Black';
  text-align: left;
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;
