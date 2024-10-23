import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import './InstructorSettings.css';
import userStore from '../../../store/UserStore';
import '../../../InputStyles.css';
import Photo from '../../../components/photo/Photo';

const InstructorSettings = observer(() => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const [file, setFile] = useState(null);

  const onFileInput = (file) => {
    setFile(file);
    console.log(file);
  }



  return(
    <main className='background-color-gray-100 instructor-wrapper'>
      <div className='instructor-settings-header'>
        <div className='background-color-gray-white settings-part'>
          <div className='settings-header'>
            <div className='settings-header-part'>
              <p className="color-gray-900 heading-04">Account settings</p>
              <div className='column-between-center'>
                <div className='setting-part'>
                  <p className='body-m400 color-gray-900'>Full name</p>
                  <div className='setting-part-inputs between-center'>
                    <input className='input body-l400' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <input className='input body-l400' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                  </div>
                </div>
                <p className='body-m400 color-gray-900'>Username</p>
                <input className='input body-l400' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <p className='body-m400 color-gray-900'>Phone number</p>
                <input className='input body-l400' placeholder='Your phone number...' value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </div>
            </div>
            <Photo onFileInput={(f) => onFileInput(f)} /> 
          </div>    
          <p className='body-m400 color-gray-900'>Username</p>
                <input className='input body-l400' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
      </div>
    </main>
  )
});

export default InstructorSettings;