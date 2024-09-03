import { Link } from 'react-router-dom';
import './Home.css';
import background from './background.png';
import { observer } from 'mobx-react-lite';
import userStore from '../../store/UserStore';

const Home = observer(() => {

    return(
        <main>
            
            <div className='hero-block standart-wrapper between-center'>
                <div className='hero-content'>
                    <p className='hero-title color-gray-900 display-02'>Learn with expert anytime anywhere</p>
                    <p className='hero-subtitle color-gray-700 body-xxxl'>Our mision is to help people to find the best course online and learn with expert anytime, anywhere.</p>
                    
                    {userStore.user == null && <Link to='/auth/sign-up'><button className='button-primary primary large button-l'>Create Account</button></Link>}
                </div>
                <img src={background} />
            </div>

            <div className='browse-block standart-wrapper'>
                <p className='browse-title color-gray-900 heading-02'>Browse top category</p>
                <div className='browse-categories'>
                    <div className='browse-row between-center'>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                    </div>
                    <div className='browse-row between-center'>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                    </div>
                    <div className='browse-row between-center'>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item background-color-secondary-100'>
                            <img src='' />
                            <div className='browse-item-content background-color-secondary-100'>
                                <p className='item-title color-gray-900 body-l500'>Label</p>
                                <p className="item-subtitle color-gray-600 body-m500">63.765 courses</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='browse-link body-m400'>We have more category & subcategory.  <Link className='color-primary-500'>Browse All</Link></p>
            </div>

            <div className='courses-block standart-wrapper'>
                <p className='browse-title heading-02'>Best selling courses</p>

                
            </div>
        </main>
    )
});

export default Home;