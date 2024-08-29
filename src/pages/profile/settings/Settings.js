import React, { useMemo, useRef, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import "./Settings.css";
import upload from "./UploadSimple.svg";
import userStore from "../../../store/UserStore";
import Notification from "../../../components/notification/Notification";
import PasswordInput from "../../../components/password-input/PasswordInput";
import { useNavigate, useLocation } from "react-router-dom";

const Settings = observer(() => {
  const ref = useRef(null);
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [title, setTitle] = useState("");
  const [userName, setUsername] = useState("");
  const [pfp, setPfp] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

//   useEffect(() => {
//     if (userStore.user == undefined) {
//       navigate("/auth/sign-in");
//     }
//   }, []);

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
            setShow(false);
            setFile(file);
            const response = await fileToBase64(file);
            setPfp(response.toString());
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
        resolve(reader.result.split(",")[1]); // Remove the data URL prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleInfoChange = async () => {
    let new_info = {
      userId: userStore.user.userId,
      firstName: firstName || userStore.user.firstName,
      lastName: lastName || userStore.user.lastName,
      email: email || userStore.user.email,
      title: title || userStore.user.title,
      userName: userName || userStore.user.userName,
      pfp: file === null ? userStore.user.pfp : pfp,
    };

    const response = await axios.post(
      "http://localhost:5000/user/update-info",
      new_info
    );
    userStore.setUser(response.data);
  };

  const handlePasswordChange = async () => {
    if (newPassword === passwordConfirmation) {
      const response = await axios.post(
        "http://localhost:5000/user/update-password",
        {
          currentPassword,
          newPassword,
          userId: userStore.user.userId,
        }
      );
      console.log(response.data);
    }
  };

  // Memoize the profile picture URL
  const profilePictureUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  return (
    <main className="settings">
      <Notification
        message="Aspect ratio should be 1:1!"
        show={show}
        onClose={handleClose}
      />
      <div className="tiny-wrapper">
        <p className="settings-title">Account settings</p>
        <div className="between-center">
          <div className="pfp-settings">
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
                <p className="upload-title">Upload Photo</p>
              </div>
            </div>
            <p className="pfp-desc">
              Image size should be under 1MB and image ratio needs to be 1:1
            </p>
          </div>
          <div className="info-settings">
            <div className="between-center">
              <div className="auth-part">
                <p className="part-title">First name</p>
                <input
                  type="text"
                  className="part-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name..."
                />
              </div>
              <div className="auth-part">
                <p className="part-title">Last name</p>
                <input
                  type="text"
                  className="part-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name..."
                />
              </div>
            </div>
            <div className="auth-part">
              <p className="part-title">Username</p>
              <input
                type="text"
                className="part-input"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username..."
              />
            </div>
            <div className="auth-part">
              <p className="part-title">Email</p>
              <input
                type="text"
                className="part-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address..."
              />
            </div>
            <div className="auth-part">
              <p className="part-title">Title</p>
              <input
                type="text"
                className="part-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your title, profession or small biography"
              />
            </div>
            <button onClick={handleInfoChange} className="main-button orange">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div className="settings-devisor"></div>
      <div className="tiny-wrapper">
        <p className="settings-title">Change password</p>
        <div className="change-password">
          <div className="auth-part">
            <p className="part-title">Current Password</p>
            <PasswordInput
              handleChange={setCurrentPassword}
              placeholder="Current Password"
            />
          </div>
          <div className="auth-part">
            <p className="part-title">New Password</p>
            <PasswordInput
              handleChange={setNewPassword}
              placeholder="Create Password"
            />
          </div>
          <div className="auth-part">
            <p className="part-title">Confirm Password</p>
            <PasswordInput
              handleChange={setPasswordConfirmation}
              placeholder="Confirm Password"
            />
          </div>
          <button className="main-button orange" onClick={handlePasswordChange}>
            Change password
          </button>
          <button className="main-button orange" onClick={() => userStore.clearUser()}>Log out</button>
        </div>
      </div>
    </main>
  );
});

export default Settings;
