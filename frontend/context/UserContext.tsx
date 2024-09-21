// 'use client'


// // UserContext.tsx
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface User {
//   id: string,
//   token: string;
//   username: string;
//   email: string;
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User) => void;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };
















'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  token: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // Remove user from localStorage if logged out
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
