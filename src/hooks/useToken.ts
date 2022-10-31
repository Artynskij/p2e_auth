import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString: any = localStorage.getItem('token');

    if (tokenString) {
      const userToken = JSON.parse(tokenString);

      return userToken
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}