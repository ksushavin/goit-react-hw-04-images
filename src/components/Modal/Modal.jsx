import { useEffect } from 'react';
import PropTypes from "prop-types";
import { createPortal } from 'react-dom';
import css from 'components/Modal/Modal.module.css';

const modalRoot = document.getElementById('modal-root');


export default function Modal ({ onClose, children }) {

    const handleKeydown = e => {
        if (e.code === 'Escape') {
            onClose()
        }
    }

    const handleClick = e => {
        if (e.target.nodeName !== 'IMG') {
            onClose() 
        }
    }
    
    useEffect(() => {

        window.addEventListener('keydown', handleKeydown);
        document.addEventListener('click', handleClick);
        
        return (() => {
            window.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('click', handleClick);
        })
    });



    return createPortal (
        <div className={css.overlay}>
            <div className={css.modal}>
                {children}
            </div>
        </div>,
        modalRoot
    )
}
                
Modal.propTypes = {
    onClose: PropTypes.func.isRequired, 
}

