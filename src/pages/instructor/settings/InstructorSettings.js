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
    <main className='background-color-gray-100 instructor-settings-header'>
      <div className='settings-block background-color-gray-white'>
        <div className=''>

        </div>
        <div className='setting-block'>
          <p className='heading-04'>Account settings</p>
          <div className='setting-block-part'>
            <p className='body-m400 color-gray-900'>Full name</p>
            <div className='setting-block-input'>

            </div>
          </div>
        </div>
        <Photo onFileInput={(file) => onFileInput(file)} />
      </div>
    </main>
  )
});

export default InstructorSettings;