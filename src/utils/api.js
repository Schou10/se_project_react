import { baseUrl } from "./constants";
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
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: { ...headers, Authorization: `Bearer ${token}`},
    body: JSON.stringify({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }),
  })
}

function deleteItem(itemId){
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${itemId}`,{
    method: "DELETE",
    headers:{ ...headers, Authorization: `Bearer ${token}`},
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

export function addCardLike(itemId, token){
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: { ...headers, Authorization: `Bearer ${token}`},
  })
}

export function removeCardLike(itemId, token){
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: { ...headers, Authorization: `Bearer ${token}`},
  })
}

export { getItems, addItem ,deleteItem, updateUser};