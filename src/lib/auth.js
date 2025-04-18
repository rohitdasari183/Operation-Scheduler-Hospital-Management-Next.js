// src/lib/auth.js

import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

/**
 * Register a new user with email and password.
 */
export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Optionally set display name
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    return user;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

/**
 * Login user with email and password.
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Logout the current user.
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Listen to auth state changes.
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
