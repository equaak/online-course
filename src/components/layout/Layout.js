import { observer } from 'mobx-react-lite';
import './Layout.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Dropdown from '../dropdown/Dropdown';
import Maindropdown from '../main-dropdown/Main-Dropdown';


const Layout = observer(() => {

    const handleSelect = (option) => {
        console.log('selected option', option);
    }

    const location = useLocation();

    return(
        <main>
            <header className='wide-wrapper between-center'>
                <div className='headers between-center'>
                    <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Home</Link>                    
                    <Link to='/courses' className={location.pathname === '/courses' ? 'active' : ''}>Courses</Link>                
                    <Link to='/about' className={location.pathname === '/about' ? 'active' : ''}>About</Link>                
                    <Link to='/contact' className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>                
                    <Link to='/becomeInstuctor' className={location.pathname === '/becomeInstuctor' ? 'active' : ''}>Become an Instructor</Link>          
                </div>

                <div className='dropdowns between-center'>
                    <Dropdown label={'USD'} options={['USD', 'KZT', 'RUS', 'JPY', 'EUR']} onSelect={handleSelect} />
                    <Dropdown label={'English'} options={['English', 'Russian']} onSelect={handleSelect} />
                </div>
            </header>
            <div className='main-header wide-wrapper between-center'>
                <div className='main-headerLeft'>
                    <img src='' />
                    <p className='main-headerTitle'>E-tutor</p>
                    <Maindropdown label={'Browse'} options={['Technology & IT', 'Business & Finance', 'Creative Arts & Design', 'Personal Development', 'Health & Wellness', 'Language Learning', 'Science & Engineering', 'Lifestyle & Hobbies']} />
                    <div className='search'>
                        <img src='' />
                        <input />
                    </div>
                </div>
            </div>
        </main>
    )
})

export default Layout;