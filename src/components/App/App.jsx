
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdCloseCircle } from 'react-icons/io';
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';


export function App () {

  const [imageQuery, setImageQuery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState(null);


  const handleChange = (name, value) => {
    switch (name) {
        case 'imageQuery':
          setImageQuery(value);
          break;
        
        case 'bigImage':
          setBigImage(value);
          break;
        
        default:
          console.log("Invalid name");
    }
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
      <>
      {showModal &&
        <Modal onClose={toggleModal}>
            <div onClick={toggleModal}>
                <IoMdCloseCircle style={{ color: 'white' }} />
            </div>
            <img
                src={bigImage}
                alt=""
            />
        </Modal>}

        <Searchbar onChange={handleChange} />
        <ImageGallery
            query={imageQuery}
            openModal={toggleModal}
            getBigImg={handleChange}/>
      
        <ToastContainer autoClose={3000} />
      </>
  )
}

