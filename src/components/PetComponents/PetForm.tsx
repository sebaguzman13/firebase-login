import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Pet from '../../models/Pet';
import './PetForm.css';

interface PetFormProps {
  onSubmit?: Function;
}

const initialValues = { name: "", kind: "", age: 0, description: "" };

function PetForm(props: PetFormProps) {
  let navigate = useNavigate();
  let location = useLocation();
  const [pet, setPet] = useState<Pet>(initialValues);

  useEffect(() => {
    !!location.state && setPet(location.state as Pet);
  }, [location])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPet({...pet, [event.currentTarget.id]: event.target.value})
  }

  const handleSubmit = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    props.onSubmit && props.onSubmit(pet);
    data.currentTarget.reset();
    goBack();
  }

  const goBack = () => { navigate(-1) }

  return (
    <div>
      <Outlet/>
      <h2>Pet Information</h2>
      <form onSubmit={handleSubmit} className={'pet-form'}>
        <input id="name" type="text" placeholder="Name" required readOnly={!!location.state} onChange={handleChange} value={pet.name}/>
        <input id="kind" type="text" placeholder="Kind" required readOnly={!!location.state} onChange={handleChange} value={pet.kind}/>
        <input id="age" type="number" placeholder="Age" min={1} step={1} readOnly={!!location.state} onChange={handleChange} value={pet.age}/>
        <textarea id="description" placeholder="Description" rows={5} readOnly={!!location.state} onChange={handleChange} value={pet.description}/>

        {!!!location.state && <button type={'submit'}>Submit</button>}
        <button type="button" onClick={goBack}>Back</button>
      </form>
    </div>
  )
}

export default PetForm