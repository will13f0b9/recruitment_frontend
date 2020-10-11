const RemoveSpecialCharacters = (value) => {
  return value ? value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') : value;
}

export default RemoveSpecialCharacters;