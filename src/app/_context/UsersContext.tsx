"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../util/types";

type userContextType = {
  loginUser: (user: string, password: string) => void;
  user: User | null;
};

const userContext = createContext<userContextType>({} as userContextType);

export const useUser = () => {
  return useContext(userContext);
};

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const loginUser = async (user: string, password: string) => {
    const response = await fetch("http://localhost:8080/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    });
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    if (!data.error) {
      setUser(data.user);
      localStorage.setItem("id", data.user._id);
    }
    if (data.error) {
      alert(data.message);
    } else if (data.user.role == "ADMIN") {
      router.push("/foodMenu");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <userContext.Provider value={{ loginUser, user }}>
      {children}
    </userContext.Provider>
  );
};

export default UsersProvider;
