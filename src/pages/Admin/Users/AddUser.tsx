import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { IAddUserRequest } from '../../../store/users/types';
import { Link } from 'react-router-dom';
import { UrlConstants } from '../../../constants';
import { addUser } from '../../../store/users/actions';
import { validateEmail } from '../../../helpers';

export const AddUser = () => {
    const [formInputs, setFormInputs] = useState({
        email: '',
        name: '',
        phone: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { email, name, phone } = formInputs;

    const loading = useSelector<AppState>((state) => state.users.loading);
    const dispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (email && name && phone) {
            const user: IAddUserRequest = {
                email: email,
                name,
                phone,
            };
            dispatch(addUser(user));
        }
    };

    return (
        <Fragment>
            <h1 className='h3 mb-4 text-gray-800'>Add new user</h1>
            <div className='card'>
                <div className='card-header'>User information</div>
                <div className='card-body'>
                    <div className="row">
                        <div className="col-sm-6">
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input
                                        type='text'
                                        className={
                                            'form-control ' +
                                            (formSubmitted && !name ? 'is-invalid' : '')
                                        }
                                        name='name'
                                        onChange={handleChange}
                                    />
                                    {formSubmitted && !name && (
                                        <div className='invalid-feedback'>Name is required</div>
                                    )}
                                </div>
                                <div className='form-group'>
                                    <label>Phone</label>
                                    <input
                                        type='text'
                                        className={
                                            'form-control ' +
                                            (formSubmitted && !phone ? 'is-invalid' : '')
                                        }
                                        name='phone'
                                        onChange={handleChange}
                                    />
                                    {formSubmitted && !phone && (
                                        <div className='invalid-feedback'>Phone is required</div>
                                    )}
                                </div>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input
                                        type='text'
                                        className={
                                            'form-control ' +
                                            (formSubmitted && (!email || !validateEmail(email))
                                                ? 'is-invalid'
                                                : '')
                                        }
                                        name='email'
                                        onChange={handleChange}
                                    />
                                    {formSubmitted && !email && (
                                        <div className='invalid-feedback'>Email is required</div>
                                    )}
                                    {formSubmitted && !validateEmail(email) && (
                                        <div className='invalid-feedback'>Email is not valid</div>
                                    )}
                                </div>
                                <div className='form-group'>
                                    <Link className='btn btn-danger mr-2' to={UrlConstants.USERS_LIST}>
                                        Cancel
                                    </Link>
                                    <button className='btn btn-primary' type='submit'>
                                        {loading && (
                                            <span className='spinner-border spinner-border-sm mr-1'></span>
                                        )}
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};