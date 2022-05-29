import { useEffect, useState } from 'react'
import { User, UserInfo } from 'firebase/auth';
import BasicUserInfo from './BasicUserInfo';
import { getLoggedUser, updateUser } from './../../services/Firebase/authentication';
import './ProfileScreen.css';

export default function ProfileScreen() {
  const [loggedUser, setLoggedUser] = useState<User>({} as User);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('u')?? "") as User;
    if (!!user) {
      console.log("logged user", user)
      setLoggedUser(user)
    }
  }, []);

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
    </div>
  )
}
