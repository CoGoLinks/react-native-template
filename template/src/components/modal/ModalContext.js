import React, { useContext } from 'react';
import { UIContext } from '../ui-provider/context';

function ModalContext() {
  const { modalValue } = useContext(UIContext);

  return <>{Object.keys(modalValue).map((item) => modalValue[item])}</>;
}

export default ModalContext;
