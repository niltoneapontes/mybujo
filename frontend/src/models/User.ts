export interface User {
  id: string;
  name: string | null;
  email: string | null;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
  phoneNumber: string | null;
  metadata: string | null;
  origin: 'FACEBOOK' | 'GOOGLE';
}
