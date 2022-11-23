import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AppBanner from '../appBanner/AppBanner';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';


const SinglePages = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);

	const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
		updateData();
    }, [id])

	const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded)
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded)
                break;
        }
	};

    const onDataLoaded = (data) => {
        setData(data);
	};

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null

    return (
        <>  
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePages