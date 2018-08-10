import fetch from 'isomorphic-fetch';

class Api {
  constructor(url) {
    this.url = url;
  }

  callApi(endpoint, method = 'get', body, token) {
    return fetch(`${this.url}/${endpoint}`, {
      headers: { 'content-type': 'application/json', 'token': (token) },
      method,
      body: JSON.stringify(body),
    })
      .then(response => response.json().then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (response.status !== 200) {
          return { error: json.error };
        } else {
          return json;
        }
      })
      .then(
        response => response,
        error => error
      );
  }
}

export default Api;
