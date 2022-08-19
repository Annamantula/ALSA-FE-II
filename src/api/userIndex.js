import { APIurl } from ".";
export async function getUserByEmail(email) {
    try {
    const response = await fetch(`${APIurl}/users`,{
     method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }