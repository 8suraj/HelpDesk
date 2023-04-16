import React from "react";
import { ModalContainer, Modals, Overlay } from "./modal.styles";
import cross from "../../assest/svgs/cross.svg";
export function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <ModalContainer>
      <Modals>
        <img src={cross} alt="" onClick={onClose} />
        {children}
      </Modals>
      <Overlay />
    </ModalContainer>
  );
}
