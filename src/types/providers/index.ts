export type UserType = {
  token: string;
  email: string;
  role: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type SessionContextType = {
  isAuthenticated: boolean;
  user: UserType;
  // eslint-disable-next-line no-unused-vars
  signIn: (data: SignInData) => Promise<void>;
};
