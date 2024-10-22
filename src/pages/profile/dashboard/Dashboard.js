import { observer } from 'mobx-react-lite';
import './Dashboard.css';

import enrolled from './PlayCircle.svg';
import active from './CheckSquareOffset.svg';
import completed from './Trophy.svg';
import instructors from './Users.svg';

import userStore from '../../../store/UserStore';

const Dashboard = observer(() => {
    return(
        <main className='dashboard'>
            <div className='tiny-wrapper'>
                <p className='settings-title color-gray-900 heading-04'>Dashboard</p>

                <div className='between-center'>
                    <div className='dashboard-item background-color-primary-100 between-center'>
                        <div className="img-container background-color-gray-white"><img src={enrolled} /></div>
                        <div className='dashboard-info'>
                            <p className='dashboard-info-title color-gray-900 body-xxxl'>957</p>
                            <p className='dashboard-info-subtitle color-gray-700 body-m400'>Enrolled courses</p>
                        </div>
                    </div>
                    <div className='dashboard-item background-color-secondary-100 between-center'>
                        <div className="img-container background-color-gray-white"><img src={active} /></div>
                        <div className='dashboard-info'>
                            <p className='dashboard-info-title color-gray-900 body-xxxl'>6</p>
                            <p className='dashboard-info-subtitle color-gray-700 body-m400'>Active courses</p>
                        </div>
                    </div>
                    <div className='dashboard-item background-color-success-100 between-center'>
                        <div className="img-container background-color-gray-white"><img src={completed} /></div>
                        <div className='dashboard-info'>
                            <p className='dashboard-info-title color-gray-900 body-xxxl'>951</p>
                            <p className='dashboard-info-subtitle color-gray-700 body-m400'>Completed courses</p>
                        </div>
                    </div>
                    <div className='dashboard-item background-color-warning-100 between-center'>
                        <div className="img-container background-color-gray-white"><img src={instructors} /></div>
                        <div className='dashboard-info'>
                            <p className='dashboard-info-title color-gray-900 body-xxxl'>241</p>
                            <p className='dashboard-info-subtitle color-gray-700 body-m400'>Course instructors</p>
                        </div>
                    </div>
                </div>
                <p className='settings-title color-gray-900 heading-04'>Let's start learning, {userStore.user?.firstName}</p>
            </div>
        </main>
    )
});

export default Dashboard;