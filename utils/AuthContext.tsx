import { createContext } from 'react';

export const AuthContext = createContext<{ token: string | undefined; setToken: (token: string | undefined) => void }>({
  token: undefined,
  setToken: () => {},
});
