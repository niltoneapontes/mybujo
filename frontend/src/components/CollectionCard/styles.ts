import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  background-color: ${(props: any) => props.theme.CARD_COLOR};
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
`;

export const TitleInput = styled.pInput`
  font-size: 16px;
  width: 100%;
  padding: 4px 8px;
  font-family: 'Inter-Bold';
  margin-bottom: 8px;
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;

export const ContentInput = styled.pInput`
  font-size: 14px;
  width: 100%;
  padding: 8px;
  margin-top: 0;
  font-family: 'Inter-Regular';
  color: ${(props: any) => props.theme.TEXT_COLOR};
  margin-bottom: 24px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 56px;
  right: 16px;
`;
