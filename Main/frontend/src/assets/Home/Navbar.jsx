import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../../Reduxstore/CategoryContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


function ConfirmationDialog({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="absolute flex justify-center items-center w-full h-[100vh] border border-black bg-black bg-opacity-50 z-100">
      <div className="bg-gray-400 p-10 rounded-lg text-white">
        <p>Are you sure you want to logout?</p>
        <div>
          <button className="w-[50px] m-2 p-2" onClick={onConfirm}>
            Yes
          </button>
          <button className="w-[50px] m-2 p-2" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // Define showConfirmation state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSubAdmin = useSelector((state) => state.auth.isSubAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    if (isLoggedIn) {
      dispatch({ type: "LOGOUT" }); // Dispatch action to update Redux store only if user is logged in
    }
    setShowConfirmation(false);
    navigate("/"); // Navigate to home page after logout
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav class="w-full h-20 flex items-center transition-all duration-500 bg-slate-50 shadow-lg">
          <div class="w-full xl:px-28 lg:px-14 px-5">
            <div class="w-full flex justify-between flex-col lg:flex-row">
              <div class="flex justify-between lg:flex-row">
                <Link class="flex items-center">
                  <img
                    className="h-[55px]"
                    id="logo"
                    src="images/craftlogo.png"
                    alt="Logo"
                  />
                </Link>
                <button
                  data-collapse-toggle="navbar-default"
                  type="button"
                  class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                  aria-controls="navbar-default"
                  aria-expanded="false"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="w-10 h-6"
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
              <div class="hidden lg:flex lg:pl-11 " id="navbar-default">
                <ul class="lg:flex items-center flex-col mt-4 lg:mt-0 lg:flex-row">
                  <li>
                    <Link
                      to={"/"}
                      class="mb-2 px-3 block lg:mr-6 mr-4 md:mb-0 lg:text-left text-center transition-all duration-700 text-gray-900 hover:text-gray-600 text-base font-medium leading-6"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/about"}
                      class="mb-2 xl:px-3 px-0 break-keep block lg:mr-6 mr-4 md:mb-0 lg:text-left text-center transition-all duration-700 text-gray-900 hover:text-gray-600 text-base font-medium leading-6"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/event"}
                      class="mb-2 xl:px-3 px-0 break-keep block lg:mr-6 mr-4 md:mb-0 lg:text-left text-center transition-all duration-700 text-gray-900 hover:text-gray-600 text-base font-medium leading-6"
                    >
                      Events
                    </Link>
                  </li>
              
                  {isLoggedIn && isAdmin ? (
                  <Link
                    to={"/admindash"}
                    class="mb-2 xl:px-3 px-0 break-keep block lg:mr-6 mr-4 md:mb-0 lg:text-left text-center transition-all duration-700 text-gray-900 hover:text-gray-600 text-base font-medium leading-6"
                  >
                    ADMIN
                  </Link>
                ) : isLoggedIn && isSubAdmin ? (
                  <Link
                    to={"/subadmindash"}
                    class="mb-2 xl:px-3 px-0 break-keep block lg:mr-6 mr-4 md:mb-0 lg:text-left text-center transition-all duration-700 text-gray-900 hover:text-gray-600 text-base font-medium leading-6"
                  >
                    SUBADMIN
                  </Link>
                ) : isLoggedIn ? (
                  <>
                    <Link
                      to={"/contact"}
                      class="mb-2 xl:px-3 px-0 break-keep block lg:mr-6 mr-4 md:mb-0 lg:text-left text-center transition-all duration-700 text-gray-900 hover:text-gray-600 text-base font-medium leading-6"
                    >
                      Contact us
                    </Link>

                    <Link to={"/profile"}>
                      <div className="mb-2 px-3 block lg:mr-6 mr-4 md:mb-0 lg:text-left text-center transition-all duration-700 text-gray-900 hover:text-gray-600 text-base font-medium leading-6">
                        <button className="profilelink">
                          <img
                            className="rounded-full border border-black"
                            id="profileimage"
                            src="./images/user.jpg"
                            alt=""
                          />
                        </button>
                      </div>
                    </Link>
                  </>
                ) :(
                  <>
                  <Link
                      to={"/contact"}
                      class="mb-2 xl:px-3 px-0 break-keep block lg:mr-6 mr-4 md:mb-0 lg:text-left text-center transition-all duration-700 text-gray-900 hover:text-gray-600 text-base font-medium leading-6"
                    >
                      Contact us
                    </Link>
                  </>
                )
              }
                </ul>

               

                {isLoggedIn ? (
                  <>
                    <FontAwesomeIcon
                      className="w-5 h-5 mb-2 mt-4 px-3 block mx-auto text-gray-900 hover:text-gray-600 transition duration-700 text-base font-medium leading-6 rounded-full cursor-pointer"
                      id="logout"
                      icon={faSignOutAlt}
                      onClick={handleLogout}
                    />
                  </>
                ) : (
                  <>
                    <div class="flex items-center justify-center  xl:ml-14 ml-2 gap-x-5">
                      <Link to={"/login"}>
                        <button class="w-20 h-11 text-white text-sm font-semibold leading-5 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full">
                          Login{" "}
                        </button>
                      </Link>
                      <Link to={"/signup"}>
                        <button class="w-24 h-11 rounded-full bg-gray-900 hover:bg-gray-700 transition-all duration-700 shadow-sm text-white text-sm font-semibold leading-5">
                          Sign up{" "}
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <ConfirmationDialog
          isOpen={showConfirmation}
          onClose={cancelLogout}
          onConfirm={confirmLogout}
        />

        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
            <Link class="flex items-center">
                  <img
                    className="h-[55px]"
                    id="logo"
                    src="images/craftlogo.png"
                    alt="Logo"
                  />
                </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                 <Link to={'/'}>
                    <button
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Home          
                    </button>
                    </Link>

                    <Link to={'/about'}>
                    <button
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >About us         
                    </button>
                    </Link>

                    <Link to={'/event'}>
                    <button
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Events        
                    </button>
                    </Link>

                    {isLoggedIn && isAdmin ? (
                      <>
                          <Link to={'/admin'}>
                    <button
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Admin         
                    </button>
                    </Link>
                      </>
                    ): isLoggedIn && isSubAdmin ? (
                      <>
                          <Link to={'/subadmin'}>
                    <button
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Subadmin        
                    </button>
                    </Link>
                      </>
                    ):(
                      <Link to={'/contact'}>
                      <button
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >Contact us         
                      </button>
                      </Link>
                    )}
                </div>
                <div className="py-6">

                  {isLoggedIn ? (
                    <button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  ):(
                    <>
                        <Link
                    to={"/login"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                  <Link
                    to={"/signup"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Sign Up
                  </Link>
                    </>
                  )}
              
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}
