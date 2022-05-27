import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Pet from '../../models/Pet';
import { getLoggedUser, getMyPets } from '../../services/Firebase/authentication'
import PetForm from '../PetComponents/PetForm';
import PetList from '../PetComponents/PetList';

function MyPetsScreen() {
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLoggedUser();
    if (!!user) {
      const pets = getMyPets();
      setMyPets(pets);
    }
  }, [])

  const handleAddPet = (pet: Pet) => {
    setMyPets([...myPets, pet])
  }
  
  const goToProfile = () => {
    navigate('/profile');
  }

  return (
    <div className={'landing-page'}>
      <PetList pets={myPets} title='My Pets'/>
      <PetForm onSubmit={handleAddPet}/>
      <button color={'grey'} onClick={goToProfile}>Back to Profile</button>
    </div>
  )
}

export default MyPetsScreen