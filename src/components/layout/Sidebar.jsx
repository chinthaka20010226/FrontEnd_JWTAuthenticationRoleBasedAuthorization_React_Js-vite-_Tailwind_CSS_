import { CiUser } from 'react-icons/ci';
import useAuth from '../../hooks/useAuth.hook';
import Button from '../general/Button';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD_ADMIN, PATH_DASHBOARD_USER } from '../../routes/paths';


const Sidebar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handelClick = (url) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        navigate(url);
    };

    return (
        <div className='shrink-0 bg-[#754eb4] w-60 p-2 min-h-[calc(100vh-48px)] flex flex-col items-stretch gap-8'>

            <div className='self-center flex flex-col items-center'>
                <CiUser className='w-10 h-10 text-white' />
                <h4 className='text-white'>
                    {user?.firstName} {user?.lastName}
                </h4>
            </div>

            {
                user.roles == "Admin" ? (
                    <div className='flex flex-col items-stretch gap-8'>
                        <Button
                            label='Users Management'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.usersManagement)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Send Message'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.sendMessage)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Inbox'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.inbox)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='All Messages'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.allMessages)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='All Logs'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.systemLogs)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='My Logs'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.myLogs)}
                            type='button'
                            variant='secondary'
                        />
                    </div>
                ) : (
                    <div className='flex flex-col items-stretch gap-8'>
                        <Button
                            label='Send Message'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.sendMessage)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Inbox'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.inbox)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='My Logs'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.myLogs)}
                            type='button'
                            variant='secondary'
                        />
                    </div>
                )
            }



        </div>
    )
}

export default Sidebar;