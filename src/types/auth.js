export const IRegisterDto = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    address: ''
};

export const ILoginDto = {
    userName: '',
    password: ''
};

export const IAuthUser = {
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    createdAt: '',
    roles: []
};

export const ILoginResponseDto = {
    newToken: '',
    userInfo: {...IAuthUser}
}

export const IAuthContextState = {
    isAuthenticated: false,
    isAuthLoading: false,
    user: {...IAuthUser}
}

// ********* Avoid Some Different Typing Error *********

export const IAuthContextActionTypes = {
    INITIAL: 'INITIAL',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

export const Roles = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

// ****************************************************

export const IAuthContextAction = {
    type: {...IAuthContextActionTypes},
    payload: {...IAuthUser}
}



const login = (userName,password) => {};
const register = (firstName,lastName,userName,email,password,address) => {};
const logout = () => {};

export const IAuthContext = {
    isAuthenticated: false,
    isAuthLoading: false,
    user: {...IAuthUser},
    login,
    register,
    logout
}