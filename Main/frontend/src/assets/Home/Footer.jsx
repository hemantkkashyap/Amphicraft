import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
       <footer class="w-full">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 py-10 max-md:max-w-sm max-md:mx-auto">
            <div class="col-span-full mb-10 lg:col-span-2 lg:mb-0">
              <a
                href="javascript:;"
                class="cursor-pointer flex justify-center lg:justify-start"
              >
               <img className='h-[80px]' src="images/craftlogo.png" alt="" />
              </a>
              <p class="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
              
              </p>
              <a
                href="javascript:;"
                class="py-2.5 cursor-pointer px-5 h-9 block w-fit bg-indigo-600 rounded-full shadow-sm text-xs text-white mx-auto transition-all  duration-500 hover:bg-indigo-700 lg:mx-0"
              >
                Contact us
              </a>
            </div>

            <div class="lg:mx-auto">
              <h4 class="text-lg text-gray-900 font-medium mb-7 ">Amphicraft</h4>
              <ul class="text-sm  transition-all duration-500">
                <li class="mb-6">
                  <Link to={"/"}
                    class="cursor-pointer text-gray-600 hover:text-gray-900"
                  >
                    Home
                  </Link>
                </li>
                <li class="mb-6">
                  <Link to={"/about"}
                    class="cursor-pointer  text-gray-600 hover:text-gray-900"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link to={"/event"}
                    class="cursor-pointer  text-gray-600 hover:text-gray-900"
                  >
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            <div class="lg:mx-auto">
              <h4 class="text-lg text-gray-900 font-medium mb-7">Helpful Links</h4>
              <ul class="text-sm  transition-all duration-500">
                <li class="mb-6">
                  <a
                    href="javascript:;"
                    class="cursor-pointer text-gray-600 hover:text-gray-900"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li class="mb-6">
                  <a
                    href="javascript:;"
                    class="cursor-pointer  text-gray-600 hover:text-gray-900"
                  >
                    Refund & Cancellation Policy
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    class="cursor-pointer  text-gray-600 hover:text-gray-900"
                  >
                    Term's & Condition
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div class="py-7 border-t border-gray-200">
            <div class="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
              <span class="text-sm text-gray-500 ">
                ©amphicraft 2024, All rights reserved.
              </span>
              <div class="flex mt-4 space-x-4 sm:justify-center sm:mt-0 ">
                
                <Link to={'https://www.instagram.com/hemant_k_kashyap/'}><img className='w-[50px]' src="images/insta.avif" alt="" /></Link> 
               <Link to={'https://www.linkedin.com/in/hemant-kumar-kashyap/'}><img className='w-[50px]' src="images/linkedin.webp" alt="" /></Link> 
               <Link to={'https://discord.gg/8BVXACnU'}><img className='w-[50px]' src="images/discord.webp" alt="" /></Link> 
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
