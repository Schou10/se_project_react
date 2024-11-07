export const baseUrl = "http://localhost:3001";
export const headers = {Accept: "application/json",
  "Content-Type": "application/json",}

export function checkResponse(res){
  if(res.ok){
    return res.json();
  } 
  return Promise.reject(`Error: ${res.status}`);  
}

function request(url, options){
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: headers,
  })
}

function addItem(data){
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }),
  })
}

function deleteItem(itemId){
  return request(`${baseUrl}/items/${itemId}`,{
    method: "DELETE",
    headers: headers,
  })
}

function updateUser({name, avatar}){
  const token = localStorage.getItem("jwt");
  
  return request(`${baseUrl}/users/me`,{
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}`},
    body: JSON.stringify({name, avatar}),
} )
} 

export function addCardLike(id, token){
  return request(`${baseUrl}/items/${id}`, {
    method: "POST",
    headers: { ...headers, Authorization: `Bearer ${token}`},
  })
}

export function removeCardLike(id, token){
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { ...headers, Authorization: `Bearer ${token}`},
  })
}

export { getItems, addItem ,deleteItem, updateUser};