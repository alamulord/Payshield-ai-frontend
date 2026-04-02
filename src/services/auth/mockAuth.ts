// src/services/auth/mockAuth.ts
import type { User } from '../../context/AuthContext';

// Extend User type to include email verification
interface ExtendedUser extends User {
  isEmailVerified: boolean;
  verificationToken?: string;
}

// Mock user database
const mockUsers: ExtendedUser[] = [
  {
    id: '1',
    email: 'admin@payshield.com',
    name: 'Admin User',
    isEmailVerified: false,
    verificationToken: 'mock-verification-token',
  },
];

// Mock token generation
const generateToken = () => {
  return 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAuth = {
  async login(email: string, password: string) {
    await delay(1000); // Simulate network delay

    // Mock validation - accept any email with password of at least 6 characters
    if (!email || !password || password.length < 6) {
      throw new Error('Invalid email or password');
    }

    // Check if user exists
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    const token = generateToken();
    localStorage.setItem('token', token);

    return { user, token };
  },

  async register(name: string, email: string, password: string) {
    await delay(1000); // Simulate network delay

    // Mock validation
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (mockUsers.find((u) => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: ExtendedUser = {
      id: Date.now().toString(),
      email,
      name,
      isEmailVerified: false,
      verificationToken: 'verify-' + Math.random().toString(36).substr(2, 9),
    };

    mockUsers.push(newUser);
    // Don't log in automatically - require email verification first
    return { user: newUser, token: '' };
  },

  async getCurrentUser() {
    await delay(500);
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    // In a real app, you would validate the token and get the user ID
    // For mock purposes, return the first user if token exists
    if (mockUsers.length > 0) {
      return mockUsers[0];
    }

    throw new Error('User not found');
  },

  async verifyEmail(token: string) {
    await delay(500);
    const user = mockUsers.find((u) => u.verificationToken === token);

    if (!user) {
      throw new Error('Invalid verification token');
    }

    user.isEmailVerified = true;
    user.verificationToken = undefined;

    // Generate a new token for the user
    const authToken = generateToken();
    localStorage.setItem('token', authToken);

    return { user, token: authToken };
  },

  async resendVerificationEmail(email: string) {
    await delay(500);
    const user = mockUsers.find((u) => u.email === email);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isEmailVerified) {
      throw new Error('Email already verified');
    }

    // In a real app, this would send an email with a new verification link
    return { success: true };
  },
};
