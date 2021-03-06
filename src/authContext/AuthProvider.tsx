import { AuthContext } from "./AuthContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { User } from './types';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  //State for checking if the user is authenticated
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User>({} as User);

  const getUserData = async() => {
    const id = localStorage.getItem("userId");
    try {
      const response = await fetch(`https://edendeskcrm.herokuapp.com/user/${id}`)
      
      const parseRes: User = await response.json();

      setUserData(parseRes);
    }catch(error){
      error instanceof Error && console.error(error.message)
    }
  }

  const checkAuth = async () => {
    try {
      const response = await fetch("https://edendeskcrm.herokuapp.com/verificar", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsLoggedIn(true) : setIsLoggedIn(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const signUp = async (
    firstname: string,
    loginemail: string,
    password: string
  ) => {
    const body = { firstname, loginemail, password };

    try {
      const response = await fetch("https://edendeskcrm.herokuapp.com/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if(parseRes.token){
      localStorage.setItem("token", parseRes.token);
      localStorage.setItem("userId", parseRes.id)
      checkAuth();
      }else{
        toast.error("Debes llenar todos los campos")
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const signIn = async (loginemail: string, password: string) => {
    const body = { loginemail, password };

    try {
      const response = await fetch("https://edendeskcrm.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("userId", parseRes.id)
        checkAuth();
      }else {
        toast.error(parseRes)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    checkAuth();
  }

  useEffect(() => {
    checkAuth();
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn && getUserData()
  }, [isLoggedIn])

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    signUp,
    signIn,
    checkAuth,
    userData,
    setUserData,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
