import { api } from '../helpers';

const login = async (email: string, password: string) => {
    // const body = { email, password };
    // return await api.post('/v1/auth', body).then((response) => {
    //   return response.data;
    // });

    // fake api
    return await new Promise<{ token: any }>((resolve) =>
        setTimeout(() => resolve({ token: 'xyz' }), 500)
    );
};

const getCurrentLoginUser = async (): Promise<any> => {
    // return await api.get<any>('/v1/auth').then((response) => {
    //   return response.data;
    // });

    // fake api
    return await new Promise<{ first_name: any }>((resolve) =>
        setTimeout(() => resolve({
            first_name: 'Admin',
        }), 500)
    );
};

export const userService = {
    login,
    getCurrentLoginUser,
};