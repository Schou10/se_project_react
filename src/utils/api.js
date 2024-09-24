const baseUrl = "http://localhost:3001";

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
  })
    .then((res)=>{
      return res.ok? res.json() :  Promise.reject(`Errpr: ${res.status}`);
    })
}

function addItem(data){
  return request(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }),
  });
}

function deleteItem(itemId){
  return request(`${baseUrl}/items/${itemId}`,{
    method: "DELETE",
  });
}

export { getItems };