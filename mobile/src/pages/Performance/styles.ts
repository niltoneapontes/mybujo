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
  font-family: 'Inter-Bold';
  text-align: left;
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;

export const ExplainingText = styled.Text`
  width: 80%;
  margin-top: 32px;
  font-size: 24px;
  font-family: 'Inter-Bold';
  text-align: left;
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: 24px;
  right: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ShareButton = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  margin-right: 12px;
  padding: 0;
  background-color: ${(props: any) => props.theme.PRIMARY_COLOR};
`;

export const ShareHeader = styled.View`
  flex-direction: row;
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px 12px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  elevation: 4;
  background: ${(props: any) => props.theme.PRIMARY_COLOR};
`;

export const ShareHeaderText = styled.Text`
  font-size: 24px;
  font-family: 'Inter-Bold';
  color: ${(props: any) => props.theme.WHITE};
`;
