class Auth {
  //localstorageがrailsのsessionに等しい
  //  if(typeof window !== 'undefined') {
  //   localStorage.setItem('myCat', 'Tom');
  // }
  static login(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  //tokenがsetされていたらtrueを返す
  static isLoggedIn() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') !== null;
    }
  }

  static logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  static getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
  }
}

export default Auth;
