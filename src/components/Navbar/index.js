"use client";

import { Fragment, useContext, useEffect } from "react";
import { GlobalContext } from "@/GlobalContext";
import { adminNavOptions, navOptions, styles } from "../utilities";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";

function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    // Hidden for medium devices
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      } `}
      id="nav-items"
    >
      <ul className="flex flex-col p-4 mx-auto font-medium rounded-b-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-neutral-700 items-center">
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer hover:font-bold block py-2 pl-3 pr-4 text-white rounded md:p-2"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer hover:font-bold block py-2 pl-3 pr-4 text-white rounded md:p-2"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const {
    showNavModal,
    setShowNavModal,
    user,
    setUser,
    isAuthUser,
    setIsAuthUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const pathName = usePathname();
  const router = useRouter();

  // Clears data after navigating away from add-product
  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathName]);

  // console.log(currentUpdatedProduct, "navbar");

  // Shows current user and authentication
  // console.log(
  //   "Current User:",
  //   user ? user.name : null,
  //   " Authenticated:",
  //   isAuthUser
  // );

  // Shows current path
  // console.log("Current Path:", pathName);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view"); // boolean

  return (
    <div>
      <nav className="bg-neutral-700 fixed w-full z-20 top-0 left-0">
        {/* Top Navbar Container */}
        <div className="bg-neutral-600 max-w-screen p-1">
          {/* Container for Cart, Account, Authentication */}
          <div className="flex md:order-2 gap-1 justify-end pr-10">
            {/* Toggle for Cart & Account */}
            <div className="flex md:order-1 gap-1">
              {!isAdminView && isAuthUser ? (
                <Fragment>
                  <button
                    onClick={() => setShowCartModal(true)}
                    className={styles.button}
                  >
                    Cart
                  </button>
                  <button
                    onClick={() => router.push("/account")}
                    className={styles.button}
                  >
                    Account
                  </button>
                </Fragment>
              ) : null}
            </div>
            {/* Toggle between Admin & Client */}
            <div className="flex md:order-2 gap-1">
              <div className="flex md:order-0">
                {user?.role === "admin" ? (
                  isAdminView ? (
                    <button
                      onClick={() => router.push("/")}
                      className={styles.button}
                    >
                      Client View
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/admin-view")}
                      className={styles.button}
                    >
                      Admin View
                    </button>
                  )
                ) : null}
              </div>
              {/* Login/Logout */}
              <div className="flex md:order-1">
                {isAuthUser ? (
                  <button onClick={handleLogout} className={styles.button}>
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/login")}
                    className={styles.button}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navbar Container */}
        <div className="max-w-screen-xl flex flex-wrap justify-center mx-auto p-1">
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center justify-center cursor-pointer rounded-full w-20"
          >
            <img
              className="rounded-full hover:brightness-110"
              src="https://i.imgur.com/jpmZZzL.png"
              alt="Brand Logo"
            />
          </div>
          <NavItems router={router} isAdminView={isAdminView} />

          {/* NavItems in Small Devices */}
          <div className="flex m">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open Main Menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </div>
  );
}
