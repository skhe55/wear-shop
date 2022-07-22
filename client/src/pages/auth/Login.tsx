import React from "react";
import TextField from "../../components/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";
import { signin, registration } from "../../redux/auth/asyncActions";
import { RequestBodyLogin } from "../../redux/auth/types";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal";

const Login: React.FC = () => {
    let navigate = useNavigate();

    const [isDisabled, setDisabled] = React.useState<boolean>(false);

    const [activeModal, setActiveModal] = React.useState<boolean>(false);

    const [login, setLogin] = React.useState<string>('developer');
    const [password, setPassword] = React.useState<string>('testpassword');

    const dispatch = useAppDispatch();

    const onChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onClickLogin = () => {
        getAuthToken();
        setActiveModal(true);
    }

    const onClickExitModal = () => {
        setActiveModal(false);
        navigate('/');
    }

    const getAuthToken = () => {
        const body: RequestBodyLogin = {
            login: login,
            password: password
        };

        dispatch(signin(body));
    }
    
    return (
        <div className="container">
            <Modal 
                active={activeModal}
                setActive={setActiveModal}
            >
            <div className='modal'>
                <h3>Вы успешно вошли в аккаунт!</h3>
                <div className='modal--buttons'>
                    <button onClick={onClickExitModal}>Закрыть окно</button>
                </div>
            </div>
            </Modal>
            <div className="container--auth">
                <div className="auth-wrapper">
                    <TextField 
                        holder="Логин"
                        isDisabled={isDisabled}
                        value={login}
                        changeValue={onChangeLogin}
                        type={'text'}
                    />
                    <TextField 
                        holder="Пароль"
                        isDisabled={isDisabled}
                        value={password}
                        changeValue={onChangePassword}
                        type={'text'}
                    />
                    <div className="auth--buttons">
                        <button className="button button --outline" onClick={onClickLogin}>
                            <span>Войти</span>
                        </button>
                        <input className="button button --outline" value={'Зарегистрироваться'} type={'button'} disabled={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;