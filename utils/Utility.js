function removeSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
}

export { removeSpecialCharacters };
