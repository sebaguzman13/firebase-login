import React, { ChangeEvent, useEffect, useState } from 'react'
import './BasicUserInfo.css';
import { UserInfo } from 'firebase/auth';
import { Link, Navigate, useNavigate, useNavigationType } from 'react-router-dom';
import avatarSvg from '../../assets/avatar.svg'
import { signOutUser } from '../../services/Firebase/authentication';

interface Props {
  user: UserInfo;
  updateUser?: (user: UserInfo) => void;
}

function BasicUserInfo(props: Props) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    props.user && setEditableUser(props.user);
    console.log(!editableUser?.photoURL ? editableUser?.photoURL : avatarSvg)
  }, [props.user])

  const handleEdition = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isEdit) {
      setIsEdit(!isEdit);
      props.updateUser && editableUser && props.updateUser(editableUser);
      setEditableUser(null)
    } else {
      setIsEdit(!isEdit);
      setEditableUser({ ...props.user });
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    editableUser &&
      setEditableUser({ ...editableUser, [event.currentTarget.name]: event?.target.value })
  }

  return (
    <div className='user-form'>
      <fieldset disabled={isEdit ? false : true}>
        <label htmlFor='email'>Email</label>
        <input name='email' type={'email'} value={props.user.email ?? ""} placeholder='Email' disabled />

        <label htmlFor='displayName'>Name</label>
        <input name='displayName' type={'text'} value={!isEdit ? props.user.displayName ?? "" : editableUser?.displayName ?? ""} onChange={handleChange} placeholder='Name' />

        <label htmlFor='photoURL'>Avatar URL</label>
        <input name='photoURL' type={'string'} value={!isEdit ? props.user.photoURL ?? "" : editableUser?.photoURL ?? ""} onChange={handleChange} placeholder='Avatar URL' />

      </fieldset>
      <div className="right-container">
        <img className='avatar' src={!!editableUser?.photoURL ? editableUser?.photoURL : avatarSvg} alt="user avatar" />
        <div className='btns-container'>
          <button onClick={handleEdition} className={!isEdit ? "" : "save"}>{!isEdit ? 'Edit'  : 'Save'}</button>
          {isEdit && <button onClick={handleEdition} className={'cancel'}>Cancel</button>}
        </div>
        <button onClick={() => navigate('/my-pets')}>My Pets</button>
        <button className='signout-btn' onClick={signOutUser}>Sign out</button>
      </div>
    </div>
  )
}

export default BasicUserInfo