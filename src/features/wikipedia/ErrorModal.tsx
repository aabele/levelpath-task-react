import React from 'react';
import { Modal } from 'antd';

interface Props {
  isOpen: boolean,
  close(): void;
}

export const ErrorModal: React.FC<Props> = ({
  isOpen,
  close,
}) => (
  <Modal title="Error" open={isOpen} onOk={close} onCancel={close}>
    <p>Unknown Error occurred while retrieving data...</p>
  </Modal>
);
