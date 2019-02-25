class Request {
  addRequest(uri) {
    return fetch(uri).then(response => {
      if (response && response.status === 200) {
        return response.json();
      }
      throw response;
    });
  }

  updateRequest(uri, data) {
    return fetch(uri, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response && response.status === 200) {
        return response.json();
      }
      throw response;
    });
  }
}

export default new Request();
