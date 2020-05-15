import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// const persistConfig = {
//   key: 'test1',
//   storage: AsyncStorage,
//   stateReconciler: autoMergeLevel2,
// };

// const pReducer = persistReducer(persistConfig, rootReducer);

// export const Store = createStore(pReducer, applyMiddleware(thunk));

// export default persistStore(Store);

export default createStore(rootReducer, applyMiddleware(thunk));
