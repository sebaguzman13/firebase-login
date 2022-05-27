import { useEffect, useState } from 'react'
import './PetList.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pet from '../../models/Pet';

interface PetListProps {
  pets?: Pet[];
  title?: string;
}

function PetList(props: PetListProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [pets, setPets] = useState<Pet[]>([])

  useEffect(() => {
    console.log(props)
    !!location.state && setPets(location.state as Pet[]);
  }, [location])

  const goToForm = () => {
    navigate('info');
  }

  const renderPet = (pet: Pet) => (
    <li>
      <Link to={'/my-pets/info'} state={pet}>{pet.name}</Link> [{pet.kind}]
    </li>
  )

  return (
    <div>
      <div className='petlist-header'>
        {props.title && <h3>{props.title}</h3>}
        <button className={'add-btn'} onClick={goToForm}>ADD</button>
      </div>
      <ul>
        {pets.map(renderPet)}
      </ul>
    </div>
  )
}

export default PetList