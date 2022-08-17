export const APIurl = "https://desolate-island-23326.herokuapp.com/api";

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
  
  export async function createProduct( {token, name, description, price, category, inventory, img_url }) {
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
      }) .then((response => response.json()))
      .then(result => {
        console.log(result) 
    }
    ).catch(console.error)
    }


    export async function updateProduct( {token, name, description, price, category, inventory, img_url,product_id }) {
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
      try{
          const response = await fetch(`${APIurl}/routine_activities/${product_id}`, {
              method: "DELETE",
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
              }
          })
          const result = await response.json();
          return result;
      }catch (error){
          console.error("Isssue deleting Activity", error)
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