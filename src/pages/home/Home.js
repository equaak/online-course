import { Link } from 'react-router-dom';
import './Home.css';
import background from './background.png';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Notification from '../../components/notification/Notification';
import { observer } from 'mobx-react-lite';
import userStore from '../../store/UserStore';

const Home = observer(() => {

    

    return(
        <main>
            
            <div className='hero-block standart-wrapper between-center'>
                <div className='hero-content'>
                    <p className='hero-title'>Learn with expert anytime anywhere</p>
                    <p className='hero-subtitle'>Our mision is to help people to find the best course online and learn with expert anytime, anywhere.</p>
                    <button className='main-button orange'>Create Account</button>
                </div>
                <img src={background} />
            </div>

            <div className='browse-block standart-wrapper'>
                <p className='browse-title'>Browse top category</p>
                <div className='browse-categories'>
                    <div className='browse-row between-center'>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                    </div>
                    <div className='browse-row between-center'>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                    </div>
                    <div className='browse-row between-center'>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                        <div className='browse-item'>
                            <img src='' />
                            <div className='browse-item-info'>
                                <p className='item-title'>Label</p>
                                <p className="item-subtitle">63.765 courses</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='browse-link'>We have more category & subcategory.  <Link>Browse All</Link></p>
            </div>

            <div className='courses-block standart-wrapper'>
                <p className='browse-title'>Best selling courses</p>

                
            </div>
        </main>
    )
});

export default Home;