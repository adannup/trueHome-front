class Request {
  addRequest(uri) {
    console.log(uri);
    return fetch(uri).then(response => {
      if (response && response.status === 200) {
        return response.json();
      }
      throw response;
    });
  }
}

export default new Request();
