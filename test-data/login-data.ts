import { LoginCredentials } from '../src/types';

export const validCredentials: LoginCredentials = {
    username: 'standard_user',
    password: 'secret_sauce'
};

export const invalidCredentials: LoginCredentials = {
    username: 'invalid_user',
    password: 'invalid_password'
};

export const lockedOutUser: LoginCredentials = {
    username: 'locked_out_user',
    password: 'secret_sauce'
}; 