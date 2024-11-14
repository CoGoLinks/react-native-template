import React, { useState } from 'react';
import { View, Modal, Button } from '@/components';

function ImagePickerPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(true);
  };

  const onDismiss = () => {
    setIsVisible(false);
  };

  return (
    <View flex center>
      <Button label="提示" onPress={handleClick} />
      <Modal
        visible={isVisible}
        onBackgroundPress={() => console.log('background pressed')}
        animationType="slide"
      >
        <Modal.TopBar
          title={'弹框'}
          onCancel={onDismiss}
          onDone={() => console.log('done')}
        />
      </Modal>
    </View>
  );
}

export default {
  name: 'ImagePicker',
  component: ImagePickerPage,
};
