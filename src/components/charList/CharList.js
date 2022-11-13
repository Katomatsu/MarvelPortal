import './charList.scss';

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(300);
    const [charEnded, setCharEnded] = useState(false);
    
    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

	const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList((charList) => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended)
	};

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const itemRefs = useRef([]);

    const addActiveClass = (id) => {
        itemRefs.forEach(item => {
            item.classList.remove('char__item_selected');
        });
        itemRefs.current[id].classList.add('char__item_selected')
    }

    function renderItems (data) {
        const elems = data.map((item, i)=> {
            let styled = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                styled = {'objectFit' : 'unset'};
            }

            return (
                <li
                    ref={el => itemRefs.current[i] = el}
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        addActiveClass(i);
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={styled} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {elems}
            </ul>
        )
    }
        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}

                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;