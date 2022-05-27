import { useLayoutEffect, useState } from 'react'
import { User, UserInfo } from 'firebase/auth';
import BasicUserInfo from './BasicUserInfo';
import { getLoggedUser, signOutUser, updateUser } from './../../services/Firebase/authentication';
import './ProfileScreen.css';

export default function ProfileScreen() {
  const [loggedUser, setLoggedUser] = useState<User>({} as User);

  useLayoutEffect(() => {
    const user = getLoggedUser();
    if (!!user) {
      setLoggedUser(user)
    }
  }, [loggedUser]);

  const handleUpdate = (updatedUserInfo: UserInfo) => {
    let user = { ...loggedUser };
    Object.keys(updatedUserInfo).forEach(attr => {
      // @ts-ignore
      user[attr] = updatedUserInfo[attr];
    })
    updateUser(user)
      .then(() => setLoggedUser(user));
  }

  return (
    <div className='landing-page'>
      <BasicUserInfo user={loggedUser} updateUser={handleUpdate} />
      <button className='signout-btn' onClick={signOutUser}>Sign out</button>
    </div>
  )
}
