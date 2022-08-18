import { APIurl } from ".";

export async function getAllProducts() {
    try {
      const response = await fetch(`${APIurl}/products`,{
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
  
  export async function createProduct( {token, name, description, price, price_type, category, inventory, img_url} ) {
    try {
      const response = await fetch(`${APIurl}/products`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
         name: name,
         description: description,
         price:price,
         price_type:price_type,
         category:category,
         inventory:inventory,
         img_url:img_url,
        })
      })
      const result = await response.json();
      console.log(result);
      return result;
    }
    catch (error) {
      console.error(error);
    }
  }


    export async function updateProduct({token, name, description, price, price_type, category, inventory, img_url,product_id }) {
      try{
      const response = await fetch(`${APIurl}/products/${product_id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
           name: name,
           description: description,
           price:price,
           price_type: price_type,
           category:category,
           inventory:inventory,
           img_url:img_url,
          })
        }
        ) 
        const result = response.json();
        return result;
      }catch(error){
        console.log(error);
      }
    }


    export async function deleteProduct(token, product_id){
      console.log(token, product_id, "HELLO")
      try{
          const response = await fetch(`${APIurl}/products/${product_id}`, {
              method: "DELETE",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          })
          const result = await response.json();
          return result;
      }catch (error){
          console.error("Isssue deleting product", error)
      }
    }


    export async function createUser(isAdmin) {
      try {
        const response = await fetch(`${APIurl}/users`,{
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