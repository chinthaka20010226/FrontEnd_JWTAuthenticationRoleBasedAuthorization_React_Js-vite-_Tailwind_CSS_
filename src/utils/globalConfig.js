import { PATH_DASHBOARD, PATH_PUBLIC } from "../routes/paths";

// URLS -> about backend
export const HOST_API_KEY = 'https://localhost:7026/api';
export const REGISTER_URL = 'https://localhost:7026/register';
export const LOGIN_URL = 'https://localhost:7026/login';
export const ME_URL = 'https://localhost:7026/me';
export const USERS_LIST_URL = 'https://localhost:7026/users';
export const USERNAMES_LIST_URL = 'https://localhost:7026/usernames';
export const ALL_MESSAGES_URL = '/Messages';
export const CREATE_MESSAGES_URL = '/Messages/create';
export const MY_MESSAGE_URL = '/Messages/mine';
export const LOGS_URL = '/Logs';
export const MY_LOGS_URL = '/Logs/mine';

// Auth Routes
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;