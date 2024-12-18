import { User } from "../interfaces/user.interface.ts";

const STORAGE_KEY = "users";
const ACCESS_TOKEN = "accessToken";
const LOGGED_USER = "logged_user";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT;
const SCOPE = process.env.REACT_APP_SCOPE;
const GITHUB_AUTH_URL = process.env.GITHUB_AUTH_URL || 'https://github.com/login/oauth/authorize';

/**
 * Register a new user
 * @param user User info to be registered
 */
export const signUp = (user: User): void => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as User[];
  if (users.some((u) => u.username === user.username)) {
    throw new Error("The user already exists.");
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...users, user]));
};

/**
 * Login into the app
 * @param username user name registered in the localStorage
 * @param password password registered in the localStorage
 */
export const login = (username: string, password: string): void => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as User[];
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) throw new Error("The user does not exist or the credentials are incorrect.");
  localStorage.setItem(LOGGED_USER, JSON.stringify(user));
  handleGitHubLogin();
};

/** Return the logged user information, otherwise null */
export const getLoggedUser = (): User | null => {
  return JSON.parse(localStorage.getItem(LOGGED_USER) || "null");
};

/** Clean the local storage, finish the session and navigate to login page */
export const logout = (): void => {
  localStorage.removeItem(LOGGED_USER);
  localStorage.removeItem(ACCESS_TOKEN);
  window.location.href = "/login";
};

/** Verify if an user is authenticated or not */
export const isAuthenticated = (): boolean => {
  return !!getLoggedUser();
};

/** Start the Oauth connection with github */
const handleGitHubLogin = () => {
  window.location.href =
    `${GITHUB_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
};

export const userName = getLoggedUser()?.firstName || '';
