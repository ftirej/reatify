export function getParsedItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function get(key) {
  return localStorage.getItem(key);
}

export function set(key, value) {
  localStorage.setItem(key, value);
}

export function remove(key) {
  localStorage.removeItem(key);
}
