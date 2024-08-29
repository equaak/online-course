import { makeAutoObservable } from "mobx";
import Cookies from "js-cookie";

class UserStore {
  user = undefined;
  onceClose = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOnClosed() {
    this.onceClose = true;
  }

  setUser(user) {
    this.user = user;
    console.log(user);
    this.setProfilePicture(user.pfp);
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
  }

  loadUserFromCookies() {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      this.user = JSON.parse(userCookie);
      console.log(this.user);
    }
  }

  clearUser() {
    this.user = undefined;
    Cookies.remove("user");
    localStorage.removeItem('token');
  }

  setProfilePicture(str) {
    if (this.user && this.user.pfp) {
      if (!str.includes("data:image/png;base64,"))
        this.user.pfp = `data:image/png;base64,${str}`;
      else {
        this.user.pfp = str;
      }
    }
  }
}

const userStore = new UserStore();
export default userStore;
