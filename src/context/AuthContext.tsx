// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut as firebaseSignOut,
  updateProfile,
  UserCredential,
  sendPasswordResetEmail,
  confirmPasswordReset,
  applyActionCode,
  checkActionCode,
  verifyPasswordResetCode,
} from 'firebase/auth';
import { auth } from '../firebase/config';

// interface AuthContextType {
//   currentUser: User | null;
//   isEmailVerified: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<UserCredential>;
//   register: (
//     name: string,
//     email: string,
//     password: string
//   ) => Promise<UserCredential>;
//   logout: () => Promise<void>;
//   sendVerificationEmail: (user: User) => Promise<void>;
//   resetPassword: (email: string) => Promise<void>;
//   updateUserProfile: (data: {
//     displayName?: string;
//     photoURL?: string;
//   }) => Promise<void>;
// }
// src/context/AuthContext.tsx
interface AuthContextType {
  currentUser: User | null;
  isEmailVerified: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<UserCredential>;
  logout: () => Promise<void>;
  sendVerificationEmail: (user: User) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sign in with email and password
  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Register new user with email and password
  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      // Send verification email
      await sendEmailVerification(userCredential.user, {
        url: `${window.location.origin}/verify-email`,
      });
      return userCredential;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Send email verification
  const sendVerificationEmail = async (user: User): Promise<void> => {
    try {
      await sendEmailVerification(user, {
        url: `${window.location.origin}/verify-email`,
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/reset-password`,
      });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (data: {
    displayName?: string;
    photoURL?: string;
  }): Promise<void> => {
    if (!auth.currentUser) throw new Error('No user is signed in');
    await updateProfile(auth.currentUser, data);
    setCurrentUser({ ...auth.currentUser });
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    isEmailVerified: currentUser?.emailVerified || false,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    sendVerificationEmail,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
