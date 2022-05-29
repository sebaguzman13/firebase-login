import React, { useEffect, useState } from 'react';
import './Modal.css';

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position?: "top" | "left" | "right" | "bottom" | "center";
  content: JSX.Element;
  btnText?: string;
  aditionalAction?: Function;
}

function Modal(props: ModalProps) {

  const handleClose = () => {
    props.aditionalAction && props.aditionalAction();
    props.setOpen(false);
  }

  return (
    <>
      { props.open ? (
        <div className={'modal-bg'}>
          <div className={`modal-content modal-${props.position?? "center"}`}>
              {props.content}
              <button className={"modal-close"} onClick={handleClose}>{props.btnText?? "OK"}</button>
          </div >
        </div >
      ) : (
        null
      )
    }
  </>)
}

export default Modal