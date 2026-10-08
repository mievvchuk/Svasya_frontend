import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'manager' | 'admin';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  city?: string;
  novaPoshta?: string;
}

export interface MockOrder {
  id: number;
  date: string;
  items: string;
  total: number;
  status: 'Нове' | 'В обробці' | 'В дорозі' | 'Доставлено';
  customerName: string;
  customerEmail: string;
}

interface AuthContextType {
  currentUser: UserProfile;
  isAuthenticated: boolean;
  login: (role?: UserRole) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  switchRole: (role: UserRole) => void;
  usersList: UserProfile[];
  toggleUserRole: (userId: number) => void;
  orders: MockOrder[];
  updateOrderStatus: (orderId: number, status: MockOrder['status']) => void;
}

const STORAGE_AUTH_KEY = 'svasya_auth_user';

const initialUsers: UserProfile[] = [
  {
    id: 1,
    name: 'Михайло Шевченко',
    email: 'mikhail@gmail.com',
    phone: '+380991234567',
    role: 'admin',
    city: 'Київ',
    novaPoshta: 'Відділення №42',
  },
  {
    id: 2,
    name: 'Олександр Бойко',
    email: 'alex.boyko@gmail.com',
    phone: '+380671112233',
    role: 'manager',
    city: 'Львів',
    novaPoshta: 'Відділення №12',
  },
  {
    id: 3,
    name: 'Дарина Коваль',
    email: 'daryna.k@gmail.com',
    phone: '+380509876543',
    role: 'manager',
    city: 'Одеса',
    novaPoshta: 'Відділення №5',
  },
  {
    id: 4,
    name: 'Іван Мельник',
    email: 'ivan.melnyk@gmail.com',
    phone: '+380934445566',
    role: 'user',
    city: 'Харків',
    novaPoshta: 'Відділення №1',
  },
];

const initialOrdersList: MockOrder[] = [
  {
    id: 15,
    date: '08.10.2026',
    items: 'White Hoodie (L) x1',
    total: 2800,
    status: 'В дорозі',
    customerName: 'Михайло Шевченко',
    customerEmail: 'mikhail@gmail.com',
  },
  {
    id: 12,
    date: '02.10.2026',
    items: 'Alien T-shirt (M) x2, Olive Cap x1',
    total: 3850,
    status: 'Доставлено',
    customerName: 'Михайло Шевченко',
    customerEmail: 'mikhail@gmail.com',
  },
  {
    id: 9,
    date: '25.09.2026',
    items: 'Tote Bag x1, Black Mug x1',
    total: 1100,
    status: 'Доставлено',
    customerName: 'Дарина Коваль',
    customerEmail: 'daryna.k@gmail.com',
  },
  {
    id: 8,
    date: '20.09.2026',
    items: 'White Hoodie (XL) x1',
    total: 2800,
    status: 'Доставлено',
    customerName: 'Іван Мельник',
    customerEmail: 'ivan.melnyk@gmail.com',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usersList, setUsersList] = useState<UserProfile[]>(initialUsers);
  const [orders, setOrders] = useState<MockOrder[]>(initialOrdersList);
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_AUTH_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialUsers[0]; // За замовчуванням адмін Михайло для зручності тесту
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const login = (role: UserRole = 'user') => {
    const user = usersList.find((u) => u.role === role) || usersList[0];
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...updated };
      setUsersList((list) =>
        list.map((u) => (u.id === next.id ? next : u))
      );
      return next;
    });
  };

  const switchRole = (role: UserRole) => {
    const matchingUser = usersList.find((u) => u.role === role);
    if (matchingUser) {
      setCurrentUser(matchingUser);
    } else {
      updateProfile({ role });
    }
  };

  // Адмін змінює простого користувача на менеджера і навпаки
  const toggleUserRole = (userId: number) => {
    setUsersList((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const nextRole: UserRole = user.role === 'user' ? 'manager' : 'user';
          if (currentUser.id === userId) {
            setCurrentUser((c) => ({ ...c, role: nextRole }));
          }
          return { ...user, role: nextRole };
        }
        return user;
      })
    );
  };

  // Менеджер оновлює статус замовлення
  const updateOrderStatus = (orderId: number, status: MockOrder['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        switchRole,
        usersList,
        toggleUserRole,
        orders,
        updateOrderStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


