export const fetchWrapper = {
  get,
  post,
};

function get(url: string) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: object, options?: object) {
  const postOptions = options ?? null;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
    postOptions,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      console.log(error);
      return Promise.reject(error);
    }

    return data;
  });
}
