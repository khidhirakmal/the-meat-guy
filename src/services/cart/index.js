import Cookies from "js-cookie";

// Create
export const addToCart = async (formData) => {
  try {
    const res = await fetch("/api/cart/add-to-cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Read
export const getAllCartItems = async (id) => {
  try {
    const res = await fetch(
      `https://the-meat-guy-eight.vercel.app/api/cart/all-cart-items?id=${id}`,
      // `http://localhost:3000/api/cart/all-cart-items?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Delete
export const deleteFromCart = async (id) => {
  try {
    const res = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
