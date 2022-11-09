class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=8b8f3cb22c233f1f1fd35d9e651796d1';
	_baseOffset = 210;

	getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
	};

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
	};

	_transformCharacter = (char) => {
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
}

export default MarvelService;
