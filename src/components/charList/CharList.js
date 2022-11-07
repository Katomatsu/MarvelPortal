import './charList.scss';

import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        charList: [],
        error: false,
        loading: true
    }
    
    marvelService = new MarvelService();

    componentDidMount()  {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

	onCharListLoaded = (charList) => {
		this.setState({
            charList,
            loading: false
        });
	};

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    renderItems = (data) => {
        const elems = data.map((item)=> {
            let styled = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                styled = {'objectFit' : 'unset'};
            }

            return (
                <li
                    className="char__item"
                    key={item.id}>
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

    render() {
        const {charList, loading, error} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}

                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;