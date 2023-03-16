import { CloseModalButton, CreateModal2 } from '../Modal/styles';
import React, { FC, useCallback } from 'react';

interface Props {
  show: boolean;
  onCloseModal2: () => void;
}
const Modal2: FC<Props> = ({ show, children, onCloseModal2 }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  return (
    <CreateModal2 onClick={onCloseModal2}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal2}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal2>
  );
};

export default Modal2;
