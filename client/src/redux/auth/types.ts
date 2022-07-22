export type RequestBodyLogin = {
    login: string;
    password: string;
}

export type ResponseBodyLogin  = {
    token: string;
}

export type RequestBodyRegistration = {
    login: string;
    password: string;
}

export type ResponseBodyRegistration  = {
    token: string;
}