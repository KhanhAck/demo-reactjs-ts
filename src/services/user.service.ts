import { api } from '../helpers';
import {
  IAddUserRequest,
  IUpdateUserRequest,
  IUser,
} from '../store/users/types';

const login = async (email: string, password: string) => {
  // fake api
  return await new Promise<{ token: any }>((resolve) =>
    setTimeout(() => resolve({ token: 'xyz' }), 500)
  );
};

const getCurrentLoginUser = async (): Promise<any> => {
  // fake api
  return await new Promise<{ name: any }>((resolve) =>
    setTimeout(() => resolve({
      name: 'Admin',
    }), 500)
  );
};

const getUsers = async (search: string): Promise<IUser[]> => {
  const res = await api
    .get<IUser[]>(`/v1/users?search=${search}`)
    .then((response) => {
      return response.data;
    });

  return res;
};

const addUser = async (user: IAddUserRequest): Promise<any> => {
  const res = await api.post(`/v1/users`, user).then((response) => {
    return response.data;
  });

  return res;
};

const updateUser = async (
  id: string,
  user: IUpdateUserRequest
): Promise<any> => {
  const res = await api.put(`/v1/users/${id}`, user).then((response) => {
    return response.data;
  });
  return res;
};

const getUserById = async (id: string): Promise<IUser> => {
  const res = await api.get<IUser>(`/v1/users/${id}`).then((response) => {
    return response.data;
  });
  return res;
};

const deleteUsers = async (id: string): Promise<any> => {
  const res = await api.delete(`/v1/users/${id}`).then((response) => {
    return response.data;
  });
  return res;
};


export const userService = {
  login,
  getCurrentLoginUser,
  getUsers,
  addUser,
  updateUser,
  getUserById,
  deleteUsers,
};