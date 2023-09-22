
"use client"

import { Provider } from "react-redux";
import {createStore} from './index'

import React from 'react'

function StoreProvider({children, preloadedState}) {
  const store = createStore(preloadedState)

  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default StoreProvider


