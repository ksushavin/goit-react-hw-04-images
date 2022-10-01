
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdCloseCircle } from 'react-icons/io';
import StateContext from 'components/StateContent';
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';


export function App () {

  const [imageQuery, setImageQuery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState(null);

  const handleQuery = (value) => {
    setImageQuery(value);
  }
  const handleBigImage = (value) => {
    setBigImage(value);
  }

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  return (
      <StateContext>
          {showModal && <Modal onClose={toggleModal}>
                <div onClick={toggleModal}>
                    <IoMdCloseCircle style={{ color: 'white' }} />
                </div>
                <img
                    src={bigImage}
                    alt=""
                />
            </Modal>}

            <Searchbar onChange={handleQuery} />
            <ImageGallery
                query={imageQuery}
                openModal={toggleModal}
                getBigImg={handleBigImage}/>
          
            <ToastContainer autoClose={3000} />
      </StateContext>
  )
}

