import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Model, useGetModelsQuery } from '../graphql/apollo/schemas';

export const ModelsContext = createContext<{
  models: Model[];
  setModels: Dispatch<SetStateAction<Model[]>>;
}>({
  models: [],
  setModels: () => {},
});

export const useModels = () => {
  const conext = useContext(ModelsContext);
  return conext;
};

export const ModelsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [models, setModels] = useState<Model[]>([]);
  const { data } = useGetModelsQuery();

  useEffect(() => {
    if (data?.getModels?.length) {
      setModels(data?.getModels as Model[]);
    }
  }, [data]);

  return (
    <ModelsContext.Provider
      value={{
        models,
        setModels,
      }}
    >
      {children}
    </ModelsContext.Provider>
  );
};
