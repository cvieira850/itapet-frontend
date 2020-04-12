import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'itapet',
      storage,
      whitelist: ['auth', 'user', 'navitem'],
    },
    reducers
  );

  return persistedReducer;
};
