/**
 * 组件容器
 */
import React, { useState } from 'react';

import { UIContext } from './context';
import { View, Toast } from '../';
import Alert from '../modal/alert';
import ModalContext from '../modal/ModalContext';

const UIProvider = ({ children }) => {
  const [modalValue, setModalValue] = useState({});

  return (
    <UIContext.Provider
      value={{
        modalValue,
        setModalValue,
      }}
    >
      <View flex>{children}</View>
      <Toast />
      <Alert />
      <ModalContext />
    </UIContext.Provider>
  );
};

export default UIProvider;
