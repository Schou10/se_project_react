const baseUrl = "http://localhost:3001";
const headers = {"Content-Type": "application/json"}

function checkResponse(res){
  console.log(res);
  if(res.ok){
    console.log("res ok");
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
}

function deleteItem(itemId){
  console.log("Deleting item deleteItem from api!");
  console.log(itemId);
  return request(`${baseUrl}/items/${itemId}`,{
    method: "DELETE",
    headers: headers,
  })
}

export { getItems, addItem ,deleteItem };