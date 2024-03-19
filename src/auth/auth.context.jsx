import {
    createContext,
    useReducer,
    useCallback,
    useEffect
} from 'react';

import { getSession, setSession } from './auth.utils';

import axiosInstance from '../utils/axiosInstance';

import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

import { 
    LOGIN_URL,
    ME_URL,
    PATH_AFTER_LOGIN,
    PATH_AFTER_REGISTER,
    PATH_AFTER_LOGOUT,
    REGISTER_URL
} from '../utils/globalConfig';


// We need a reducer function for useReducer hook
const authReducer = (state,action) => {
    if(action.type === 'LOGIN'){
        return {
            ...state,
            isAuthenticated: true,
            isAuthLoading: false,
            user: action.payload,
        }
    }
    if(action.type === 'LOGOUT'){
        return {
            ...state,
            isAuthenticated: false,
            isAuthLoading: false,
            user: undefined,
        }
    }
    return state;
};

// we need an initial state object for useReducer hook
const initialAuthState = {
    isAuthenticated: false,
    isAuthLoading: true,
    user: undefined,
};

// we create our context here and export
export const AuthContext = createContext(null);

// we create a component to manage all auth functionalities and export it and use it
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer,initialAuthState);
    const navigate = useNavigate();

    // Initialize Method
    const initializeAuthContext = useCallback(async () => {
        try {
            const token = getSession();
            if(token) {
                // validate accessToken by calling backend
                const response = await axiosInstance.post(ME_URL, {
                    token
                });
                // In response, we receive jwt token and user data
                const { newToken, userInfo } = response.data;
                setSession(newToken);
                dispatch({
                    type: 'LOGIN',
                    payload: userInfo,
                })
            } else {
                setSession(null);
                dispatch({
                    type: 'LOGOUT',
                });
            }
        } catch (error) {
            setSession(null);
            dispatch({
                type: 'LOGOUT',
            });
        }
    },[]);

    // In start of Application, we call initializeAuthContext to be sure about authentication status
    useEffect(() => {
        console.log('AuthContext Initialization start');
        initializeAuthContext()
            .then(() => console.log('initializeAuthContext was successfull'))
            .catch((error) => console.log(error));
    },[]);

    // Register Method
    const register = useCallback(async (firstName,lastName,userName,email,password,address) => {
        const response = await axiosInstance.post(REGISTER_URL, {                                                                    
            firstName,
            lastName,
            userName,
            email,
            password,
            address,
        });
        console.log('Register Result:', response);
        toast.success('Register Was Successfull. Please Login.');
        navigate(PATH_AFTER_REGISTER);
    },[]);

    //Login Method
    const login = useCallback(async (userName,password) => {
        const response = await axiosInstance.post(LOGIN_URL, {
            userName,
            password,
        });
        toast.success('Login Was Successful');

        // In response, we receive jwt token and user data
        const { newToken, userInfo } = response.data;
        setSession(newToken);
        dispatch({
            type: 'LOGIN',
            payload: userInfo,
        });
        navigate(PATH_AFTER_LOGIN);
    },[]);

    // Logout Method
    const logout = useCallback(() => {
        setSession(null);
        dispatch({
            type: 'LOGOUT',
        });
        navigate(PATH_AFTER_LOGOUT);
    },[]);

    // We create an object for values of context provider
    // This will keep our codes more readable
    const valuesObject = {
        isAuthenticated: state.isAuthenticated,
        isAuthLoading: state.isAuthLoading,
        user: state.user,
        register,
        login,
        logout,
    };

    return ( <AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider> )

};

export default AuthContextProvider;