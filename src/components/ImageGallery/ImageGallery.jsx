import { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import Loader from 'components/loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import fetchApi from 'components/services/imagesAPI';
import Button from 'components/Button/Button';
import css from 'components/ImageGallery/ImageGallery.module.css';


export default function ImageGallery ({ query, openModal, getBigImg}) {

    const [images, setImages] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);


    const usePrevious=(value)=>{
        const ref = useRef(value);

        useEffect(() => {
            ref.current = value;
        });
        return ref.current
    }
    const prevQuery = usePrevious(query);
    


    const loadMore = () => {
        setPage(prev => prev + 1);
    }

    const reset = () => {
        setImages([]);
        setPage(1);
    }


    const fetchImages = (imageQuery, page, pics=images) => {

        fetchApi(imageQuery, page)
        .then(data => {
            if (data.hits.length) {
                setImages([...pics, ...data.hits]);
                setStatus('resolved');
                return
            }
            return Promise.reject(
                new Error(`Немає результатів за запитом ${imageQuery}`)
            )
        })   
            .catch(error => {
                setError(error);
                setStatus('rejected');    
        })  
    }


    useEffect(() => {
        
        if (!query) {
            return
        }
        if (query !== prevQuery) {
            reset();
            setStatus('pending');
            fetchImages(query, 1, []);
            return
        }
        fetchImages(query, page);
        setStatus('pending');
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, page, prevQuery]);



    if (status === 'rejected') {
        return(<div>{error.message}</div>)
    }
    if (status === 'pending') {
        return <Loader />
    }
    if (status === 'idle') {
        return(<div className={css.notificatin}>Введіть запит</div>)
    }
    if (status === 'resolved') {
        const imagesList = images.map(({ webformatURL, largeImageURL, id }) => {
            return (
                <ImageGalleryItem
                    url={webformatURL}
                    key={id}
                    bigImage={largeImageURL}
                    openModal={openModal}
                    getBigImg={getBigImg}
                    
                />
            )
        })

        return (
            <>
                <ul className={css.imageGallery}>
                    {imagesList}
                </ul>
                
                <Button onClick={loadMore} />
            </>  
        ) 
    } 

}

ImageGallery.propTypes = {
    query: PropTypes.string, 
    openModal: PropTypes.func, 
    getBigImg: PropTypes.func,
}