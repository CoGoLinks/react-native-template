import React, { forwardRef } from 'react';
import { Image as ULImage, ImageProps as ULImageProps } from 'react-native-ui-lib';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { get } from 'lodash-es';
import { Assets } from '../';
import { useCommonProps, CommonProps } from '../common';

export type ImageProps = ULImageProps &
  CommonProps & {
    fill?: string;
  };

const Image = forwardRef((props: ImageProps, ref: any) => {
  const { assetGroup = 'images', assetName, source, ...otherProps } = props;
  const restProps = useCommonProps(otherProps);
  if (!restProps.show) {
    return null;
  }

  return (
    <ULImage
      ref={ref}
      source={source || get(Assets, `${assetGroup}.${assetName}`)}
      assetGroup={assetGroup}
      {...restProps}
    />
  );
});

hoistNonReactStatic(Image, ULImage);

export default Image;
