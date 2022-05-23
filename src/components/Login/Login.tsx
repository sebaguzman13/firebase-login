import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

interface LoginProps {
  register?: boolean;
}

export default function Login(props: LoginProps) {
  return (
    <div className='landing-page'>
      <LoginForm register={!!props.register}/>
      {!props.register ? (
      <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
      ) : (
        <p>Already registered? <Link to={'/login'}>Login</Link></p>
      )}
    </div>
  )
}
