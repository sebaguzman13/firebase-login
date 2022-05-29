import { EventHandler, MouseEventHandler, useEffect, useState } from 'react'
import './PetList.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pet from '../../models/Pet';

interface PetListProps {
  pets?: Pet[];
  title?: string;
  addButtonAction?: Function;
}

function PetList(props: PetListProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [pets, setPets] = useState<Pet[]>([])

  useEffect(() => {
    props.pets && setPets(props.pets);
  }, [props.pets])

  const renderPet = (pet: Pet, index: number) => (
    <li key={index+pet.name}>
      <Link to={'/my-pets/info'} state={pet}>{pet.name} [{pet.kind}]</Link>
    </li>
  )

  return (
    <div className='petlist-container'>
      <div className='petlist-header'>
        {props.title && <h3>{props.title}</h3>}
        {props.addButtonAction && <button className={'add-btn'} onClick={() => props.addButtonAction!()}>ADD</button>}
      </div>
      <ul className='petlist-items'>
        {pets.map(renderPet)}
      </ul>
    </div>
  )
}

export default PetList