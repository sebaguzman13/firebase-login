import React, { ChangeEvent, useState } from 'react'
import { UserInfo } from 'firebase/auth';
import './BasicUserInfo.css';
import { Link } from 'react-router-dom';

interface Props {
  user: UserInfo;
  updateUser?: (user: UserInfo) => void;
}

function BasicUserInfo(props: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<UserInfo | null>(null)

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
        <img className='avatar' src="" alt="user avatar" />
        <div className='btns-container'>
          <button onClick={handleEdition}>{!isEdit ? 'Update Information' : 'Save'}</button>
          {isEdit && <button onClick={handleEdition}>Cancel</button>}
        </div>

        <Link to={'/my-pets'}>My Pets</Link>
      </div>
    </div>
  )
}

export default BasicUserInfo