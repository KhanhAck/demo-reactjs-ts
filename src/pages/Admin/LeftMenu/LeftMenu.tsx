import React, { useState } from 'react';

import { Link } from 'react-router-dom';

export const LeftMenu = () => {
    const [isToggled, setIsToggled] = useState(false);
    const [isComponentShow, setIsComponentShow] = useState(false);
    return (
        <ul
            className={
                'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' +
                (isToggled ? ' toggled' : '')
            }
            id='accordionSidebar'
        >
            {/* Sidebar - Brand */}
            <Link
                className='sidebar-brand d-flex align-items-center justify-content-center'
                to='/'
            >
                <div className='sidebar-brand-icon rotate-n-15'>
                    <i className='fas fa-laugh-wink' />
                </div>
                <div className='sidebar-brand-text mx-3'>
                    SB ADMIN <sup>2</sup>
                </div>
            </Link>
            {/* Divider */}
            <hr className='sidebar-divider my-0' />
            {/* Nav Item - Dashboard */}
            <li className='nav-item active'>
                {/* <a className='nav-link' href='/'>
                    <i className='fas fa-fw fa-tachometer-alt' />
                    <span>Dashboard</span>
                </a> */}
                <Link to="/" className='nav-link'>
                    <i className='fas fa-fw fa-tachometer-alt' />
                    <span>Dashboard</span>
                </Link>
            </li>
            {/* Divider */}
            <hr className='sidebar-divider' />
            {/* Heading */}
            <div className='sidebar-heading'>Interface</div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className='nav-item'>
                <a
                    className={'nav-link' + (isComponentShow ? '' : ' collapsed')}
                    href='javascript:void(0);'
                    data-toggle='collapse'
                    data-target='#collapseTwo'
                    aria-expanded={isComponentShow ? 'true' : 'false'}
                    aria-controls='collapseTwo'
                    onClick={() => setIsComponentShow(!isComponentShow)}
                >
                    <i className='fas fa-fw fa-cog' />
                    <span>System</span>
                </a>
                <div
                    id='collapseTwo'
                    className={'collapse' + (isComponentShow ? ' show' : '')}
                    aria-labelledby='headingTwo'
                    data-parent='#accordionSidebar'
                >
                    <div className='bg-white py-2 collapse-inner rounded'>
                        <h6 className='collapse-header'>Custom Components:</h6>
                        <Link className='collapse-item' to='/users'>
                            Users
                        </Link>
                    </div>
                </div>
            </li>
            <hr className='sidebar-divider d-none d-md-block' />
            {/* Sidebar Toggler (Sidebar) */}
            <div className='text-center d-none d-md-inline'>
                <button
                    className='rounded-circle border-0'
                    id='sidebarToggle'
                    onClick={() => setIsToggled(!isToggled)}
                />
            </div>
        </ul>
    );
};