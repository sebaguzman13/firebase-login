import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../../services/Firebase/authentication';
import './LoginForm.css'

interface LoginData {
  email: string;
  password: string;
}

interface LoginFormProps {
  register: boolean;
}

const initialValues = { 
  email: "", 
  password: "",
}

export default function LoginForm(props: LoginFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>(initialValues);

  useEffect(() => {
    resetForm();
  }, [props.register])

  const resetForm = () => {
    setFormData(initialValues)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    if (!!props.register) {
      signUp(formData.email, formData.password)
        .then(() => navigate("/login", { state: { register: true } }));
    } else {
      signIn(formData.email, formData.password)
        .then(() => navigate("/profile"));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{props.register ? 'Register' : 'Login'}</h1>
      <input type={'email'} name="email" placeholder="Email..." value={formData.email} onChange={handleChange} />
      <input type={'password'} name="password" placeholder="Password..." value={formData.password} onChange={handleChange} />
      <div className='button-container'>
        <button type='submit'>Submit</button>
        <button className='cancel' type='button' onClick={() => navigate('/')}>Cancel</button>
      </div>
    </form>
  )
}
