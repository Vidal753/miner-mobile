import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createExpoFileSystemStorage from 'expo-filesystem-storage';
import reducer from '../Reducer';

const expoFsStorage = createExpoFileSystemStorage();

const persisConfig = {
  key: 'root',
  storage: expoFsStorage,
};

const persistedReducer = persistReducer(persisConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
