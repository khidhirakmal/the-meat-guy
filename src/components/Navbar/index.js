"use client";

import { Fragment, useContext } from "react";
import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions, styles } from "../utilities";
import CommonModal from "../CommonModal";

// false by default to hide admin and authUser view
const isAdminView = false;
const isAuthUser = false;
const user = {
  role: "admin",
};

function NavItems({ isModalView = false }) {
  return (
    // Hidden for medium devices
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      } `}
      id="nav-items"
    >
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-neutral-700 sm:items-center">
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-white rounded md:p-2"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block text-white rounded p-2 md:ml-20"
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
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);

  return (
    <>
      <nav className="bg-neutral-700 fixed w-full z-20 top-0 left-0">
        {/* NavBar Container */}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
          {/* Logo */}
          <div className="flex items-center cursor-pointer rounded-full w-20">
            <img src="https://i.imgur.com/jpmZZzL.png" alt="Brand Logo" />
          </div>

          {/* Container for Cart, Account, Authentication */}
          <div className="flex md:order-2 gap-4">
            {/* Toggle for Cart & Account */}
            <div className="flex md:order-1 gap-1">
              {!isAdminView && isAuthUser ? (
                <Fragment>
                  <button className={styles.button}>Cart</button>
                  <button className={styles.button}>Account</button>
                </Fragment>
              ) : null}
            </div>
            {/* Toggle between Admin & Client */}
            <div className="flex md:order-2 gap-2">
              <div className="flex md:order-0">
                {user?.role === "admin" ? (
                  isAdminView ? (
                    <button className={styles.button}>Admin View</button>
                  ) : (
                    <button className={styles.button}>Client View</button>
                  )
                ) : null}
              </div>
              {/* Login/Logout */}
              <div className="flex md:order-1">
                {isAuthUser ? (
                  <button className={styles.button}>Logout</button>
                ) : (
                  <button className={styles.button}>Login</button>
                )}
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                  onClick={() => setShowNavModal(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <NavItems isModal={false} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={<NavItems isModalView={true} />}
        show={showNavModal}
        setShow={setShowNavModal}
      />
    </>
  );
}
