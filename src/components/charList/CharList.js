import './charList.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        charList: [],
        error: false,
        loading: true,
        newItemLoading: false,
        offset: 300,
        charEnded: false
    }
    
    marvelService = new MarvelService();

    componentDidMount()  {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

	onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

		this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
	};

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    addActiveClass = (id) => {
        if (this.itemRefs) {
            this.itemRefs.forEach(item => {
                item.classList.remove('char__item_selected');
            });
            this.itemRefs[id].classList.add('char__item_selected')
        }
    }

    renderItems = (data) => {
        const elems = data.map((item, i)=> {
            let styled = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                styled = {'objectFit' : 'unset'};
            }

            return (
                <li
                    ref={this.setRef}
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id)
                        this.addActiveClass(i);
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

    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;

        const items = this.renderItems(charList);

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
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;