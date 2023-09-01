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

  /// CHECK USER AUTHENTICATION AND SET USER STATE  ///
  useEffect(() => {
    console.log(Cookies.get("token"));
    // Check if the "token" cookie is defined (user is authenticated)
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true); // Set the "isAuthUser" state to true (user is authenticated)

      const userData = JSON.parse(localStorage.getItem("user") || {}); // Get user data from localStorage
      setUser(userData); // Set the "user" state using the retrieved user data

      const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(getCartItems); // Set the "cartItems" state using the retrieved data
    } else {
      setIsAuthUser(false); // Set the "isAuthUser" state to false (user is not authenticated)
      setUser({}); // Set the "user" state using the retrieved user data, important to prevent unauthorized activities
    }
  }, [Cookies]); // Dependency array with "Cookies" as the dependency

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
      pathName !== "/register" &&
      !pathName.includes("product") &&
      pathName !== "/" &&
      user &&
      Object.keys(user).length === 0 &&
      protectedRoutes.includes(pathName) > -1
    )
      router.push("/login");
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
