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


    export async function updateProduct({token, name, description, price, price_type, category, inventory, img_url, product_id, isActive }) {
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
           isActive:isActive
          })
        }
        ) 
        const result = response.json();
        return result;
      }catch(error){
        console.log(error);
      }
    }

    export async function updateCartProduct({ count, guest_cart_id, cart_product_id }) {
      try{
      const response = await fetch(`${APIurl}/cart/guest/${guest_cart_id}/${cart_product_id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            count: count,
          })
        }
        ) 
        const result = response.json();
        return result;
      }catch(error){
        console.log(error);
      }
    }

    export async function updateUserCartProduct({token, count, user_id, product_id }) {
      try{
      const response = await fetch(`${APIurl}/cart/users/${user_id}/${product_id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            count: count,
          })
        }
        ) 
        const result = await response.json();
        console.log(result , "myyy ressuuuult")
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
          console.log(result, "Result")
          return result;
      }catch (error){
          console.error("Isssue deleting product", error)
      }
    }

    export async function activateProduct(token, product_id){
      console.log(token, product_id, "HELLO")
      try{
          const response = await fetch(`${APIurl}/products/${product_id}`, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          })
          const result = await response.json();
          console.log(result, "Result")
          return result;
      }catch (error){
          console.error("Issue activating product", error)
      }
    }

    export async function getProductById(product_id){
      try{
        const response= await fetch(`${APIurl}/products/${product_id}`, {
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

    export async function addProductToCart(product_id, cart_id, count){
      console.log(cart_id)
      try{
        const response= await fetch(`${APIurl}/products/cart/${product_id}/${cart_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
           count:count
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


    export async function getGuestCartByCode(code){
      try{
        const response = await fetch(`${APIurl}/cart/guest/${code}`,{
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

    export async function getCartByUserId (token, user_id){
      console.log(user_id, token, "APIid")
      try{
        const response = await fetch(`${APIurl}/cart/users/${user_id}`,{
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
    
    export async function createUserCart (token) {
      try{
        const response = await fetch(`${APIurl}/cart/users`, {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      })
      const result = await response.json();
      console.log(result);
      return result;
    }
    catch (error) {
      console.error(error);
    }
  }

  export async function createGuestCart () {
    try{
      const response = await fetch(`${APIurl}/cart/guest`, {
        method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
    })
    const result = await response.json();
    console.log(result);
    return result;
  }
  catch (error) {
    console.error(error);
  }
}

// export async function deleteGuestCart(code){
//   try{
//     const response = await fetch(`${APIurl}/cart/guest/${code}`,{
//       method: "DELETE",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function deleteGuestCart(code){
  try{
    const response = await fetch(`${APIurl}/cart/guest/${code}`,{
      method: "DELETE",
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



export async function deleteUserCart (token, user_id){
  console.log(token, "token for deletion")
  try{
    const response = await fetch(`${APIurl}/cart/users/${user_id}`,{
      method: "DELETE",
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

    // export async function createUser(isAdmin) {
    //   try {
    //     const response = await fetch(`${APIurl}/users`,{
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }
    //     });
    //     const result = await response.json();
    //     return result;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }