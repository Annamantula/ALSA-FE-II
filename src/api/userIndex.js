import { APIurl } from ".";
export async function getUser(token) {
    try {
    const response = await fetch(`${APIurl}/users/me`,{
     method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }