import React from "react";
import { useAppDispatch } from "../../hooks/typed-hooks";
import styles from './Modal.module.scss';

type ModalProps = {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({active, setActive, children}) => {
    return (
        <div className={active ? styles['modal--active'] : styles.modal} onClick={() => setActive(false)}>
            <div className={active ?  styles['modal__content--active'] : styles.modal__content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}