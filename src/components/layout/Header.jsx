import useAuth from '../../hooks/useAuth.hook';
import Button from '../general/Button';
import { AiOutlineHome } from 'react-icons/ai';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD_ADMIN, PATH_DASHBOARD_USER, PATH_PUBLIC } from '../../routes/paths';
import { useEffect, useState } from 'react';


const Header = () => {
    const { isAuthenticated, isAuthLoading, user, logout } = useAuth();
    const navigate = useNavigate();
    const [mode, setMode] = useState(() => {
        // Check if mode is stored in local storage
        const storedMode = localStorage.getItem('mode');
        // Return stored mode if exists, otherwise default to 'user'
        return storedMode ? storedMode : 'user';
    });

    // Update local storage when mode changes
    useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode]);

    const toggleMode = () => {
        // Toggle mode between 'user' and 'admin'
        setMode(preMode => (preMode == 'user' ? 'admin' : 'user'));
    };

    const userRolesLabelCreator = () => {
        if (user && user.roles) {
            return user.roles;
        }
        return '--';
    };

    return (
        <div className='flex justify-between items-center bg-[#f0ecf7] h-12 px-4 '>
            <div className='flex items-center gap-4'>
                <AiOutlineHome
                    className='w-8 h-8 text-purple-500 hover:text-purple-700 cursor-pointer'
                    onClick={() => navigate('/')}
                />
                {
                    mode == 'user' ? (
                        <div className='flex justify-center items-center'>
                            <ul className='flex gap-4 items-center justify-center'>
                                <li className='cursor-pointer'>Home</li>
                                <li className='cursor-pointer'>Services</li>
                                <li className='cursor-pointer'>About</li>
                                <li className='cursor-pointer'>Contact</li>
                            </ul>
                        </div>
                    ) : (
                        <div className='flex gap-1 justify-between items-center'>
                            <h1 className='px-1 border border-dashed border-purple-300 rounded-lg'>
                                AuthLoading: {isAuthLoading ? 'True' : '--'}
                            </h1>
                            <h1 className='px-1 border border-dashed border-purple-300 rounded-lg flex items-center gap-1'>
                                Auth:
                                {isAuthenticated ? <FiUnlock className='text-green-600' /> : <FiLock className='text-red-600' />}
                            </h1>
                            <h1 className='px-1 border border-dashed border-purple-300 rounded-lg'>
                                UserName: {user ? user.userName : '--'}
                            </h1>
                            <h1 className='px-1 border border-dashed border-purple-300 rounded-lg'>
                                UserRoles: {userRolesLabelCreator()}
                            </h1>
                        </div>
                    )
                }
            </div>
            <div className='flex items-center'>
                {
                    isAuthenticated ? (
                        <div className='flex items-center gap-2'>
                            <Button
                                label='Dashboard'
                                onClick={() => user.roles == "Admin" ? navigate(PATH_DASHBOARD_ADMIN.dashboard) : navigate(PATH_DASHBOARD_USER.dashboard)}
                                type='button'
                                variant='light'
                            />
                            <Button
                                label='Logout'
                                onClick={logout}
                                type='button'
                                variant='light'
                            />
                        </div>
                    ) : (
                        <div className='flex items-center gap-2 px-5'>
                            <Button
                                label='Register'
                                onClick={() => navigate(PATH_PUBLIC.register)}
                                type='button'
                                variant='light'
                            />
                            <Button
                                label='Login'
                                onClick={() => navigate(PATH_PUBLIC.login)}
                                type='button'
                                variant='light'
                            />
                        </div>
                    )
                }
                {
                    isAuthenticated ? (
                        <div></div>
                    ) : (
                        <button
                            className='mx-2 cursor-default h-9 w-14 rounded-2xl bg-white flex items-center transition duration-300 focus:outline-none shadow'
                            onClick={toggleMode}>
                            <div
                                id='switch-mode'
                                className={`cursor-pointer m-0 h-9 w-9 flex items-center justify-center relative rounded-full transition duration-500 transform bg-violet-500 
                                ${mode == 'user' ? '-translate-x-2' : 'translate-x-full'} p-1 text-white`}>
                                {mode == 'user' ? 'U' : 'A'}</div>
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Header;