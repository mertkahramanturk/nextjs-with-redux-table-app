import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './product-store'; 
import {reducer as categoryReducer} from './category-store';

const rootReducer = combineReducers({
  products: productsReducer,
  category: categoryReducer,
});

export function createStore(preloadedState: any = {}) {
  const Store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return Store;
}

export const Store = createStore();
