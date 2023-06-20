export const request = async (patch: string, info: {}, method: string) => {
  const API_URL = process.env.API_URL;
  const user_id = localStorage.getItem('user_id');
  const refreshToken = localStorage.getItem('refresh_token');

  if (!user_id || !refreshToken) {
    window.open('http://localhost:3000/401');
    return null;
  } else {
    const id = JSON.parse(user_id || '');
    const token = JSON.parse(refreshToken || '');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  
    try {
      const response: Response = await fetch(`${API_URL}/${patch}`, {
        method: method,
        headers,
        body: JSON.stringify({user_id: id, ...info})
      });
      const data = await response.json();       
      if(response.status === 200) {                
        localStorage.setItem('refresh_token', refreshToken);
        return data;
      }
  
      if (response.status === 201) {
        const refreshToken = data;
        localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
      }
  
      if (response.status === 401) {
        window.open('http://localhost:3000/401')
      }

    } catch (e) {
      return console.log(e);
    }
  }
};