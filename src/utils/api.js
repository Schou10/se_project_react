const baseUrl = "http://localhost:3001";
const headers = {"Content-Type": "application/json"}

function checkResponse(res){
  if(res.ok){
    return res.json();
  } 
  return Promise.reject(`Error: ${res.status}`);  
}

function request(url, options){
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: headers,
  })
    .then(checkResponse)
}

function addItem(data){
  console.log(data);
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }),
  })
  .then(checkResponse)
}

function deleteItem(itemId){
  console.log(itemId);
  return request(`${baseUrl}/items/${itemId}`,{
    method: "DELETE",
    headers: headers,
  })
  .then(checkResponse)
}

export { getItems, addItem ,deleteItem };