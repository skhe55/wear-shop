import React from "react";
import styles from './TextField.module.scss';

type TextFieldProps = {
    holder: string;
    isDisabled: boolean;
    value: string;
    changeValue: (value: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

const TextField:React.FC<TextFieldProps> = ({holder, isDisabled, value, changeValue, type}) => {
    return (
        <div className={styles['container']}>
            <input 
                type={type}
                disabled={isDisabled}
                value={value}
                onInput={changeValue}
                className={value !== '' ? styles['input--not-empty'] : styles['input--empty']}
            />
            <span>{holder}</span>
        </div>
    );  
}

export default TextField;