import './Layout.css';
import logo from '../../../layout/logo.svg';
import { observer } from 'mobx-react-lite';
import { Link, Outlet } from 'react-router-dom';

const InstructorLayout = observer(() => {
    return(
        <main className='between-center'>
            <div className='inst-menu background-color-gray-900 inst-menu-wrapper'>
                <Link to='/'>                
                    <div className='menu-header'>
                        <img src={logo} alt='' />
                        <p className='color-gray-white heading-04 menu-title'>E-tutor</p>
                    </div>
                </Link>
            </div>
            <Outlet />
        </main>
    )
});

export default InstructorLayout;