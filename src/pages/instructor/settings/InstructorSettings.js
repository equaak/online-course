import { observer } from "mobx-react-lite";
import { useState } from "react";
import "./InstructorSettings.css";
import "../../../InputStyles.css";
import Photo from "../../../components/photo/Photo";
import TextCheckbox from "../../../components/text-checkbox/TextCheckbox";
import PasswordInput from "../../../components/password-input/PasswordInput";
import userStore from "../../../store/UserStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InstructorSettings = observer(() => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [biography, setBiography] = useState("");
  const [buy, setBuy] = useState(false);
  const [review, setReview] = useState(false);
  const [commnet, setComment] = useState(false);
  const [download, setDownload] = useState(false);
  const [replied, setReplied] = useState(false);
  const [visited, setVisited] = useState(false);
  const [attach, setAttach] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pfp, setPfp] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const onFileInput = (file, pfp) => {
    setFile(file);
    setPfp(pfp);
  };

  const handleBuy = (active) => {
    setBuy(active);
  }

  const handleReview = (active) => {
    setReview(active);
  }

  const handleComment = (active) => {
    setComment(active);
  }

  const handleDownload = (active) => {
    setDownload(active);
  }

  const handleReply = (active) => {
    setReplied(active);
  }

  const handleVisit = (active) => {
    setVisited(active);
  }

  const handleAttach = (active) => {
    setAttach(active);
  }

  const handleInfoChange = async () => {
    let new_info = {
      userId: userStore.user.userId,
      firstName: firstName || userStore.user.firstName,
      lastName: lastName || userStore.user.lastName,
      email: userStore.user.email,
      title: title || userStore.user.title,
      userName: username || userStore.user.userName,
      pfp: file === null ? userStore.user.pfp : pfp,
    };

    const response = await axios.post(
      "http://localhost:5000/user/update-info",
      new_info
    );

    console.log(response.data);
    userStore.setUser(response.data);
  };

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword) {
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

  const handleLogout = () => {
    userStore.clearUser();
    navigate('/');
  }

  return (
    <main className="background-color-gray-100 instructor-settings-header">
      <div className="settings-block background-color-gray-white">
        <div className="between-start">
          <div className="setting-block column-between-center">
            <div>
              <p className="heading-04">Account settings</p>
              <div className="setting-block-part">
                <p className="body-m400 color-gray-900 input-title">
                  Full name
                </p>
                <div className="setting-block-input">
                  <input
                    type="text"
                    placeholder="First name"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="setting-block-part">
              <p className="body-m400 color-gray-900 input-title">Username</p>
              <input
                type="text"
                placeholder="Enter your username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="setting-block-part">
              <p className="body-m400 color-gray-900 input-title">
                Phone number
              </p>
              <input
                type="text"
                placeholder="Enter your phone number..."
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <Photo
            background={"gray"}
            onFileInput={(file, pfp) => onFileInput(file, pfp)}
            size={"small"}
          />
        </div>
        <div className="setting-block-part">
          <p className="body-m400 color-gray-900 input-title">Title</p>
          <input
            type="text"
            placeholder="Your title, proffesion or small biography"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="setting-block-part">
          <p className="body-m400 color-gray-900 input-title">Biography</p>
          <textarea
            type="text"
            placeholder="Your title, proffesion or small biography"
            className="input"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            rows={4}
          />
        </div>

        <button onClick={handleInfoChange} className="button-primary primary medium button-m">
          Save changes
        </button>

        <button onClick={handleLogout} className="button-secondary primary medium button-m">
          Logout
        </button>
      </div>

      <div className="between-center">
        <div className="settings-block background-color-gray-white">
          <p className="heading-04">Notification</p>
          
          <div className="last-container">
            <TextCheckbox text={'I want to know who buy my course.'} onClick={(active) => handleBuy(active)} />
            <TextCheckbox text={'I want to know who write a review on my course.'} onClick={(active) => handleReview(active)} />
            <TextCheckbox text={'I want to know who commented on my lecture.'} onClick={(active) => handleComment(active)} />
            <TextCheckbox text={'I want to know who download my lecture notes.'} onClick={(active) => handleDownload(active)} />
            <TextCheckbox text={'I want to know who replied on my comment.'} onClick={(active) => handleReply(active)} />
            <TextCheckbox text={'I want to know daily how many people visited my profile.'} onClick={(active) => handleVisit(active)} />
            <TextCheckbox text={'I want to know who download my lecture attach file.'} onClick={(active) => handleAttach(active)} />
          </div>

          <button className="button-primary primary medium button-m">
            Save changes
          </button>
        </div>
        <div className="settings-block background-color-gray-white">
          <p className="heading-04">Change password</p>
          <div className="last-container">
            <PasswordInput
              handleChange={setCurrentPassword}
              placeholder="Current Password"
            />
            <PasswordInput
              handleChange={setNewPassword}
              placeholder="New Password"
            />
            <PasswordInput
              handleChange={setConfirmPassword}
              placeholder="Confirm Password"
            />
          </div>
          <button onClick={handlePasswordChange} className="button-primary primary medium button-m">
            Save changes
          </button>
        </div>
      </div>
    </main>
  );
});

export default InstructorSettings;
