import React from "react";
import styles from './TextField.module.scss';

type TextFieldProps = {
    holder: string;
    isDisabled: boolean;
    value: string;
    changeValue: (value: string) => void;
    type: string;
}

const TextField:React.FC<TextFieldProps> = ({holder, isDisabled, value, changeValue, type}) => {
    return (
        <div className={styles['container']}>
            <input 
                type={type}
                disabled={isDisabled}
                placeholder={holder}
                value={value}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => changeValue(event.target.value)}
            />
        </div>
    );  
}

export default TextField;