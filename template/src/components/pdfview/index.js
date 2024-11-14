import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import Pdf from 'react-native-pdf';
/**
 * https://www.npmjs.com/package/react-native-pdf
 * PDF组件
 */
export default forwardRef((props, ref) => {
  const {
    source = {},
    onLoadComplete = () => {},
    onPageChanged = () => {},
    onPressLink = () => {},
    onError = () => {},
    ...other
  } = props;

  const pdfRef = useRef();

  useImperativeHandle(ref, () => pdfRef.current);

  return (
    <Pdf
      ref={pdfRef}
      source={source}
      onLoadComplete={onLoadComplete}
      onPageChanged={onPageChanged}
      onPressLink={onPressLink}
      onError={onError}
      {...other}
    />
  );
});
