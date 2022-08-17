import { APIurl } from ".";

export async function getCustomers(token) {
    try {
        const response = await fetch(`${APIurl}/customers`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            }
          });
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error(error);
    }
}
