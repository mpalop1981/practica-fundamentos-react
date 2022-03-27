import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;

export function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export default AuthContext;
