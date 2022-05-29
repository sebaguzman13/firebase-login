import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Pet from '../../models/Pet';
import { getLoggedUser, getMyPets } from '../../services/Firebase/authentication'
import Modal from '../common/Modal';
import PetForm from '../PetComponents/PetForm';
import PetList from '../PetComponents/PetList';

function MyPetsScreen() {
  const navigate = useNavigate();
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getData = async () => {
    const user = localStorage.getItem('u');
    if (!!user) {
      // TOOD include firestore DB call once implemented
      const pets = await getMyPets();
      setMyPets([...pets]);
    } else {
      navigate('/');
    }
  }

  useEffect(() => {
    getData();    
  }, [])

  const toggleModal = () => { setOpenModal(true) }

  const handleAddPet = (pet: Pet) => {
    setMyPets([...myPets, pet])
  }
  
  const goToProfile = () => {
    navigate('/profile');
  }

  return (
    <div className={'landing-page'}>
      <PetList pets={myPets} title='My Pets' addButtonAction={toggleModal}/>
      <Modal 
        content={<PetForm onSubmit={handleAddPet} noBgColor/>} 
        open={openModal} 
        setOpen={setOpenModal} 
        btnText={'Close'}
        position='bottom'
      />
      <button style={{ width: "auto" }} onClick={goToProfile}>Profile</button>
    </div>
  )
}

export default MyPetsScreen