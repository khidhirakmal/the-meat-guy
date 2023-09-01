"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

/*
The GlobalState component is a context provider that manages and shares various state variables using the useState hooks. It maintains 
values such as showNavModal, pageLevelLoader, componentLevelLoader, etc. 

These values to be accessible and modifiable by other components throughout the application through the context API. It centralizes 
state management and provides a way to share data and stateful logic across different parts of the application.
*/
export const GlobalContext = createContext(null);

// Create initial state for CheckoutComponent
export const initialCheckoutFormData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

// Initialize state values using useState hook
export default function GlobalState({ children }) {
  // Nav States //
  const [showNavModal, setShowNavModal] = useState(false);
  // Loading States
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  // User States //
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  // Product States //
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  // Cart States //
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // Address States //
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    city: "",
    country: "",
    postalCode: "",
    address: "",
  });
  // Checkout States //
  const [checkoutFormData, setCheckoutFormData] = useState(
    initialCheckoutFormData
  );
  // Order States //
  const [allOrdersForUser, setAllOrdersForUser] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);

  // Function to get user data from localStorage
  function getUserData() {
    try {
      const userDataString = localStorage.getItem("user");
      return userDataString ? JSON.parse(userDataString) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  }

  // Function to get cart items from localStorage
  function getCartItems() {
    try {
      const cartItemsString = localStorage.getItem("cartItems");
      return cartItemsString ? JSON.parse(cartItemsString) : [];
    } catch (error) {
      console.error("Error parsing cart items from localStorage:", error);
      return [];
    }
  }

  // CHECK USER AUTHENTICATION AND SET USER STATE
  useEffect(() => {
    console.log(Cookies.get("token"));

    // Check if the "token" cookie is defined (user is authenticated)
    const isAuthenticated = Cookies.get("token") !== undefined;

    setIsAuthUser(isAuthenticated); // Set the "isAuthUser" state

    if (isAuthenticated) {
      // If authenticated, get and set user data and cart items
      const userData = getUserData();
      const cartItemsData = getCartItems();

      setUser(userData); // Set the "user" state
      setCartItems(cartItemsData); // Set the "cartItems" state
    } else {
      setUser({}); // Set the "user" state to an empty object
    }
  }, [Cookies]);

  /// PROTECT ROUTES FROM UNAUTHORIZED ACCESS ///
  const router = useRouter();
  const pathName = usePathname();

  // Routes accessible to only registered users
  const protectedRoutes = [
    "/cart",
    "/checkout",
    "/account",
    "/orders",
    "/admin-view",
  ];

  // Routes accessible to only administrators
  const protectedAdminRoutes = [
    "/admin-view",
    "/admin-view/add-product",
    "/admin-view/all-products",
  ];

  useEffect(() => {
    if (
      pathName !== "/register" && // Check if the current URL path is not "/register"
      !(pathName.includes("product") || pathName.includes("promotions")) && // Check if the current URL path does not include the word "product" or "promotions"
      pathName !== "/" && // Check if the current URL path is not the root ("/")
      user && // Check if a user object exists (user is logged in)
      Object.keys(user).length === 0 && // Check if the user object is empty (no user data)
      protectedRoutes.includes(pathName) > -1 // Check if the current URL path is included in the "protectedRoutes" array
    ) {
      router.push("/login"); // If all the above conditions are met, redirect the user to the login page
    }
  }, [user, pathName]);

  useEffect(() => {
    if (
      user !== null &&
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== "admin" &&
      protectedAdminRoutes.indexOf(pathName) > -1
    )
      router.push("/unauthorized-page");
  }, [user, pathName]);

  return (
    // The `Provider` component wrap allows child components to have access to the GlobalContext //
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setPageLevelLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        checkoutFormData,
        setCheckoutFormData,
        allOrdersForUser,
        setAllOrdersForUser,
        orderDetails,
        setOrderDetails,
        allOrdersForAllUsers,
        setAllOrdersForAllUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
