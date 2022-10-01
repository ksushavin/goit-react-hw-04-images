import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from "prop-types";
import Loader from 'components/loader/Loader';
import { useContext } from 'react';
import { stateContext } from 'components/StateContent';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import fetchApi from 'components/services/imagesAPI';
import Button from 'components/Button/Button';
import css from 'components/ImageGallery/ImageGallery.module.css';


export default function ImageGallery({ query, openModal, getBigImg }) {
    
    const { images, changeImages, page, changePage } = useContext(stateContext);

    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const usePrevious=(value)=>{
        const ref = useRef(value);

        useEffect(() => {
            ref.current = value;
        });
        return ref.current
    }
    const prevQuery = usePrevious(query);
    const prevPage = usePrevious(page);


    const loadMore = () => {
        changePage(prev => prev + 1);
    }

    const fetchImages = useCallback((imageQuery, page) => {
        fetchApi(imageQuery, page)
            .then(data => {
                if (data.hits.length) {
                    changeImages([...images, ...data.hits]);
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
    }, [images, changeImages]);


    useEffect(() => {
        
        if (!query) {
            return
        }
        if (page !== prevPage || query !== prevQuery) {
            fetchImages(query, page);
            setStatus('pending');
            return
        }
    }, [query, page, prevQuery, prevPage, fetchImages]);



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

