export default class Api {
    constructor(config) {
      this.url = config.url
      this.authorization = config.authorization
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }
    
    getInfoProfile () {
        return fetch(`${this.url}/users/me`, {
           headers: {
               authorization: this.authorization
           } 
        })  
        .then(res => {
            return this._getResponseData(res) 
        })}
   
    _
    getCards() {
        return fetch(`${this.url}/cards`, {
            headers: {
                authorization: this.authorization
            }
        })
        .then(res => {
            return this._getResponseData(res) 
        })
    };

    patchInfoProfile(name, about) {  
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
              },
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