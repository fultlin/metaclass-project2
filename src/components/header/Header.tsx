import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/logo/Logo';
import Avatar from './components/ava/Avatar';
import repoStore from '../../store/RepoStore/RepoStore';

const Header = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        repoStore.resetStore();
        navigate('/');
    };

    return (
        <header>
            <div className="wrapper header">
                <div className='logo__title' onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                    <Logo />
                    <span className='logo__title--text'>GitHub Client</span>
                </div>
                <Avatar />
            </div>
        </header>
    );
};

export default Header;
