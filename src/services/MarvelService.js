import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
	const {loading, error, request, clearError} = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=8b8f3cb22c233f1f1fd35d9e651796d1';
	const _baseOffset = 309;
	const _comicsOffset = 10000

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
	};

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = _comicsOffset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
	};

	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: !char.description ? 'we dont have data about this character' : char.description.length >= 210 ? `${char.description.slice(0, 210)}...` : char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			hompage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		};
	};

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			price: comics.prices[0].price ? `${comics.prices[0].price + '$'}` : `NOT AVAILABLE`,
			thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us',
		};
	};

	return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic}
}

export default useMarvelService;
