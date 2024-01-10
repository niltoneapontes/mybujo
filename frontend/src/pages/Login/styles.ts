import styled from 'styled-components';
import { lightTheme } from '../../tokens/colors';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: any) => lightTheme.GRAY400};
  position: relative;
`;

export const LoginImage = styled.img`
width: 50vw;
  height: 100vh;
`;

export const ButtonsContainer = styled.div`
  width: 50vw;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const GoogleButton = styled.button`
display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 54px;
  width: 100%;
  max-width: 20rem;
  background-color: ${(props: any) => lightTheme.WHITE};
  border-radius: 0.5rem;
  elevation: 4;
  margin-bottom: 0.75rem;
`;

export const GoogleButtonText = styled.p`
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  margin-left: 1rem;
  font-weight: bold;
  color: ${(props: any) => lightTheme.GOOGLE_COLOR};
`;

export const Disclaimer = styled.p`
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
  color: ${(props: any) => lightTheme.TEXT_COLOR};
  text-align: center;
  margin: 1rem;
`;

export const DisclaimerLink = styled.a`
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
  text-decoration: underline;
  color: ${(props: any) => lightTheme.PRIMARY_COLOR};
  text-align: center;
  margin: 0.5rem;
`;

export const FacebookButton = styled.button`
  padding: 0.75rem;
  background-color: ${(props: any) => lightTheme.FACEBOOK};
  border-radius: 0.5rem;
  height: 54px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const FacebookButtonText = styled.p`
  color: ${(props: any) => lightTheme.WHITE};
  padding-left: 1rem;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
`;
