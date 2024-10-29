import { baseUrl } from "./api";

// The register function accepts the necessary data as arguments,
// and sends a POST request to the given endpoint.
export const register = ({name, avatar, email, password}) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
};

export const login = ({email, password}) => {
  // A POST request is sent to /signin
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // The parameters are wrapped in an object, converted to a JSON
    // string, and sent in the body of the request.
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    localStorage.setItem("jwt", res.token);
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};