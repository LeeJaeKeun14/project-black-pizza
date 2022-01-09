import axios from 'axios';

export const signUp = async (signUpInfo) => {
  try {
    const { data } = await axios.post("/api/user/signup", signUpInfo);
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const logIn = async (loginInfo) => {
  try {
    const { data } = await axios.post("/api/user/signin", loginInfo);
    return data;
  } catch (error) {
    console.log(error)
  }
};

export const logout = async () => {
  try {
    const { data } = await axios.get("api/user/signout")
    return data
  } catch (error) {
    console.log(error)
  }
}

export const isLogin = async () => {
  try {
    const { data } = await axios.get("/api/user/isSignin")
    return data
  } catch (error) {
    console.log(error)
  }
}
