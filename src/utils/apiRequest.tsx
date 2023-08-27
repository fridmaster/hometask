async function apiRequest(
  apiURL:string
) { 

  //TODO: add more use cases for apiRequest
  return window.fetch(`${apiURL}`).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {apiRequest}