import { makeAutoObservable } from "mobx";
import Cookies from "js-cookie";
import axios from "axios";

class UserStore {
  user = null;
  onceClose = false;
  pfp = null;

  constructor() {
    makeAutoObservable(this);
  }

  setOnClosed() {
    this.onceClose = true;
  }

  async setUser(user) {
    console.log('setUser');
    this.user = user;
    if (user?.userId) {
      const responce = await axios.get(
        "http://localhost:5000/user/get-pfp?id=" + user.userId
      );
      this.setProfilePicture(responce.data);
    }  

    Cookies.set('user', JSON.stringify(this.user), { expires: 1 });
  }

  async setUserObject(user) {
    this.user = user;
    if (user?.userId) {
      const responce = await axios.get(
        "http://localhost:5000/user/get-pfp?id=" + user.userId
      );
      this.setProfilePicture(responce.data);
    }
    this.clearUser();
  }

  async loadUserFromCookies() {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      this.user = JSON.parse(userCookie);
      const responce = await axios.get(
        "http://localhost:5000/user/get-pfp?id=" + this.user.userId
      );
      this.setProfilePicture(responce.data);
    }
  }

  clearUser() {
    this.user = null;
    this.pfp = null;
    Cookies.remove("user");
    localStorage.removeItem("token");
  }

  setProfilePicture(str) {
    if (this.user && str) {
      if (!str.includes("data:image/png;base64,"))
        this.pfp = `data:image/png;base64,${str}`;
      else {
        this.pfp = str;
      }
    }
  }
}

const userStore = new UserStore();
export default userStore;
