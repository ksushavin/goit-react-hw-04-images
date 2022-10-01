import { useState, createContext } from 'react';

export const stateContext = createContext();


const StateContext = ({ children }) => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);

    const changeImages = (value) => {
        setImages(value)
    }

    const changePage = (number) => {
        setPage(number)
    }

    return (
        <stateContext.Provider value={{images, changeImages, page, changePage}}>
            {children}
        </stateContext.Provider>
    )
}
export default StateContext;