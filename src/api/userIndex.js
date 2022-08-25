import { APIurl } from ".";
export async function getUser(token) {
  try {
    const response = await fetch(`${APIurl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createContactInfo({
  first_name,
  last_name,
  email,
  phone,
  street,
  street_num,
  apt,
  city,
  zip,
}) {
  try {
    const response = await fetch(`${APIurl}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        street: street,
        street_num: street_num,
        apt: apt,
        city: city,
        zip: zip,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}
