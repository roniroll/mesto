export default class Api {
    constructor(Url, headers) {
      this.Url = Url;
      this.headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }
    
    getInfoProfile() {
        return fetch(`${this.Url}/users/me`, {
            method: 'GET',
            headers: this.headers
            })
        .then(res => {
            return this._getResponseData(res) 
        })
    };

   
    _
    getCards() {
        return fetch(`${this.Url}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(res => {
            return this._getResponseData(res) 
        })
    };

    patchInfoProfile(name, about) {  
        return fetch(`${this.Url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
              name: name,
              about: about
            })
        })
        .then(res => {
            return this._getResponseData(res)
        }) 
    };

    addNewCard(name, link) {
        return fetch(`${this.Url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }
}