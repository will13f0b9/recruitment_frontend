const RemoveSpecialCharacters = (value) => {
  return value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}

export default RemoveSpecialCharacters;