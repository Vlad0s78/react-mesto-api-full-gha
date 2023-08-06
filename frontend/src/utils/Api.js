class Api {
  constructor({ baseUrl, headers, credentials }) {
    this._address = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  _request(endpoint, options) {
    return fetch(`${this._address}/${endpoint}`, options)
    .then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  updateUserInfo({ name, about }) {
    return this._request(`users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  getInitialCards() {
    return this._request(`cards`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  addNewCard({ name, link }) {
    return this._request(`cards`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  updateAvatar({ avatar }) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  deleteCardFromServer(cardId) {
    return this._request(`cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
        credentials: this._credentials,
      });
    } else {
      return this._request(`cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
        credentials: this._credentials,
      });
    }
  }

  getUsers() {
    return this._request(`users`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    });
  }
}

export const api = new Api({
  baseUrl: "https://api.vladislove.students.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: 'include',
});
