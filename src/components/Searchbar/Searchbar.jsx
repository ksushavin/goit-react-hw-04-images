import { useState } from 'react';
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from 'react-icons/bs';
import { useContext } from 'react';
import { stateContext } from 'components/StateContent';
import css from 'components/Searchbar/Searchbar.module.css'

export default function Searchbar({ onChange }) {

    const { changeImages, changePage } = useContext(stateContext);

    
    const [imageQuery, setImageQuery] = useState('');
    
    const handeImageChange = e => {
        e.preventDefault();
        setImageQuery(e.currentTarget.value.toLowerCase())
    }

    const resetForm = () => {
        setImageQuery('')
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (imageQuery.trim() === '') {
            toast.error('Введите ваш запрос');
            return
        }

        onChange(imageQuery);
        changeImages([]);
        changePage(1);
        resetForm();
    }

    
    return (
        <header className={css.searchbar}>
            <form onSubmit={handleSubmit} className={css.searchForm}>
                <button type="submit" className={css.button}>
                    <span className={css.buttonLabel}>
                        <BsSearch />
                    </span>
                </button>

                <input
                    onChange={handeImageChange}
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={imageQuery}
                />
            </form>
        </header>
    )    
}
 

Searchbar.propTypes = {
    onChange: PropTypes.func.isRequired, 
}
