import PropTypes from "prop-types";
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';


export default function ImageGalleryItem({ bigImage, getBigImg, openModal, url }) {
    
    const handleClick = () => {
        getBigImg(bigImage);
        openModal();
    }

    return (
        <li className={css.galleryItem}>
            <img
                onClick={handleClick}
                className={css.gallaryImage}
                src={url}
                alt=""
            />
        </li>
    )
    
}

ImageGalleryItem.propTypes = {
    url: PropTypes.string,
    id: PropTypes.string, 
    openModal: PropTypes.func, 
    getBigImg: PropTypes.func,
}