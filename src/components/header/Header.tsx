import './styleHeader.scss'
import Logo from './components/logo/Logo'
import Avatar from './components/ava/Avatar'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className="wrapper header">
                <Link to='/'>
                    <div className="logo-title">
                        <Logo/>
                        <span className='logo-title--text'>GitHub Client</span>
                    </div>
                </Link>
                <Avatar/>
            </div>
        </header>
    )
}

export default Header