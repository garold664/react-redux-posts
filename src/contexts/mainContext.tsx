import { useContext, createContext, useState } from 'react';

type MainContext = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  closeErrorMsg: () => void;
};

const mainContext = createContext<MainContext | null>(null);
export const useMainContext = () => {
  const value = useContext(mainContext);
  if (value == null) throw Error('Cannot use outside of MainContextProvider');
  return value;
};

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState('');
  const closeErrorMsg = () => {
    setError('');
  };
  return (
    <mainContext.Provider value={{ error, setError, closeErrorMsg }}>
      {children}
    </mainContext.Provider>
  );
};

export default MainContextProvider;
