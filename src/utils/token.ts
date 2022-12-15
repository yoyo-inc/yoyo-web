export function getToken() {
  if (sessionStorage.getItem('token')) {
    return sessionStorage.getItem('token');
  } else {
    return localStorage.getItem('token');
  }
}

export function clearToken() {
  sessionStorage.removeItem('token');
  localStorage.removeItem('token');
}
