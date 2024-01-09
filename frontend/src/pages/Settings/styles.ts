import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props: any) => props.theme.BACKGROUND_COLOR};
`;

export const SettingsHeader = styled.div`
  background-color: ${(props: any) => props.theme.PRIMARY_COLOR};
  height: 144px;
  width: 100%;
`;

export const ProfilePicture = styled.Image`
  height: 144px;
  width: 144px;
  border-radius: 72px;
  margin-top: -72px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  padding: 16px;
  padding-bottom: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileContentContainer = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfileName = styled.p`
  font-size: 32px;
  font-weight: 700;
  font-family: 'Inter-Bold';
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;

export const ProfileDescription = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 24px;
  font-family: 'Inter-Regular';
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;

export const Version = styled.p`
  font-size: 12px;
  position: absolute;
  bottom: 8px;
  font-family: 'Inter-Regular';
  color: ${(props: any) => props.theme.TEXT_COLOR};
`;
