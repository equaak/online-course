import { observer } from 'mobx-react-lite';
import { useRef, useState, useEffect, useMemo } from 'react';
import './Photo.css';

import upload from '../../pages/profile/settings/UploadSimple.svg';
import Notification from '../notification/Notification';

const Photo = ({onFileInput}) => {
    const ref = useRef(null);
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);
    const [pfp, setPfp] = useState(null);

    const handleClick = () => {
        ref.current.click();
    };

    const handleInput = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = async () => {
              if (img.width === img.height) {
                setFile(file);
                const response = await fileToBase64(file);
                setPfp(response.toString());
                onFileInput(file);
              } else {
                setShow(true);
              }
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
    };

    const handleClose = () => {
        setShow(false);
    };

    const profilePictureUrl = useMemo(() => {
        return file ? URL.createObjectURL(file) : null;
    }, [file]);

    return(
        <div className="pfp-settings">
            <Notification
                message="Aspect ratio should be 1:1!"
                show={show}
                onClose={handleClose}
            />
            <div
              className="pfp"
              style={
                profilePictureUrl
                  ? {
                      backgroundImage: `url(${profilePictureUrl})`,
                      backgroundSize: "cover",
                    }
                  : {}
              }
            >
              <input
                onChange={handleInput}
                ref={ref}
                type="file"
                accept="image/*"
              />
              <div onClick={handleClick} className="upload">
                <img src={upload} />
                <p className="upload-title color-gray-white body-m500">Upload Photo</p>
              </div>
            </div>
            <p className="pfp-desc color-gray-600 body-m400">
              Image size should be under 1MB and image ratio needs to be 1:1
            </p>
        </div>
    )
};

export default Photo;