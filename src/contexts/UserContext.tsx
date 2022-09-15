import * as React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useApi } from "./ApiContext";

interface User {
  id: string;
  email: string;
  is_superuser: boolean;
  groups: string[];
  full_name: string;
  username: string;
  permissions: string[];
}

interface UserContext {
  user: User | null;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  changePassword: (
    oldPassword: string,
    newPassword1: string,
    newPassword2: string,
  ) => Promise<void>;
}

const UserContext = React.createContext<UserContext>(
  undefined as unknown as UserContext,
);
export const useUser = () => React.useContext(UserContext);

export const UserContextProvider: React.FC<React.PropsWithChildren<{}>> = (
  { children },
) => {
  const api = useApi();
  const [user, setUser] = useLocalStorage("user", null);

  React.useEffect(() => {
    api.isAuthenticated().then((authenticated) => {
      if (!authenticated) {
        setUser(null);
      }
    });
  }, [user]);

  const login = async (username: string, password: string) => {
    const response = await api?.operations["bananas.login:create"].call({
      body: { username, password },
    });

    if (response !== undefined && response.ok) {
      const user = await response.json();
      setUser(user);
      return user;
    }

    setUser(null);
    return null;
  };

  const changePassword = async (
    oldPassword: string,
    newPassword1: string,
    newPassword2: string,
  ) => {
    const response = await api?.operations["bananas.change_password:create"]
      .call({
        body: {
          old_password: oldPassword,
          new_password1: newPassword1,
          new_password2: newPassword2,
        },
      });

    if (!response.ok) {
      throw new Error("Failed to change password");
    }
  };

  const logout = async () => {
    const response = await api?.operations["bananas.logout:create"].call();

    if (response !== undefined && response.ok) {
      setUser(null);
      return;
    }

    throw new Error("Could not log out");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, changePassword }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
