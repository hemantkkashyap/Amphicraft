import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import {
  Navigation,
  Pagination,
  Thumbs,
  Keyboard,
  Scrollbar,
} from "swiper/modules";
import Footer from "./Footer";
import Navbar from "./Navbar";

function About() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
     <Navbar/>
      <section className="pt-40 py-14 lg:py-24 relative z-0 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl md:leading-normal">
          Meet Our Team: Passionate Minds Behind{" "}
            <span className="text-indigo-600">Amphicraft</span>
          </h1>
          <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
          Discover the faces and stories driving innovation in event management for our college community.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            <div className="img-box">
              <img
                src="./images/Ourteam.jpg"
                alt="About Us"
                className="max-lg:mx-auto"
              />
            </div>
            <div className="lg:pl-[100px] flex items-center">
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                  About Us
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  Good software is a work of art, and good art takes time. Our
                  teams spend years mastering their craft in order to deliver
                  exceptional products that customers love. Software isn't just
                  our paycheck: It's our Passion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9">
            <div className="lg:pr-24 flex items-center">
              <div className="data w-full">
                <img
                  src="./images/Ourteam.jpg"
                  alt="About Us"
                  className="block lg:hidden mb-9 mx-auto"
                />
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center">
                  The Problem we solve
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                At Amphicraft, we tackle the challenges faced by college communities in event organization and management. Our platform streamlines the process, from planning and promotion to registration and participation. By providing an intuitive solution, we empower administrators, organizers, and students alike to create vibrant and engaging campus experiences.
                </p>
              </div>
            </div>
            <div className="img-box">
              <img
                src="./images/Ourteam.jpg"
                alt="About Us"
                className="hidden lg:block"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">
            Our results in numbers
          </h2>
          <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-indigo-600">
                  240%
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 font-semibold mb-2">
                    Company growth
                  </h4>
                  <p className="text-xs text-gray-500 leading-5">
                    Company's remarkable growth journey as we continually
                    innovate and drive towards new heights of success.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-indigo-600">
                  10+
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 font-semibold mb-2">
                    Team members
                  </h4>
                  <p className="text-xs text-gray-500 leading-5">
                    Our very talented team members are the powerhouse of
                    pagedone and pillars of our success.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-indigo-600">
                  20+
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 font-semibold mb-2">
                    Projects Completed
                  </h4>
                  <p className="text-xs text-gray-500 leading-5">
                    We have accomplished more than 20 projects and we
                    are still counting many more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-16 rounded-full">
            <h2 className="text-4xl font-manrope font-bold text-gray-900 text-center">
              What our happy user says!
            </h2>
          </div>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            navigation
            pagination={{ clickable: true }}
            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : false}
            modules={[Navigation, Pagination, Thumbs, Keyboard, Scrollbar]}
            className="mySwiper2"
          >
            <SwiperSlide>
              <div className="relative mb-20">
                <div className="max-w-max mx-auto lg:max-w-4xl">
                  <p className="text-lg text-gray-500 leading-8 mb-8 text-center">
                  Our users rave about Amphicraft's seamless event management system. From effortlessly organizing events to hassle-free registration and participation, they appreciate the user-friendly interface and comprehensive features that enhance their college experience. With increased attendance and engagement, Amphicraft has become a valuable asset to our campus community.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative mb-20">
                <div className="max-w-max mx-auto lg:max-w-4xl">
                  <p className="text-lg text-gray-500 leading-8 mb-8 text-center">
                  Our users rave about Amphicraft's seamless event management system. From effortlessly organizing events to hassle-free registration and participation, they appreciate the user-friendly interface and comprehensive features that enhance their college experience. With increased attendance and engagement, Amphicraft has become a valuable asset to our campus community.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative mb-20">
                <div className="max-w-max mx-auto lg:max-w-4xl">
                  <p className="text-lg text-gray-500 leading-8 mb-8 text-center">
                  Our users rave about Amphicraft's seamless event management system. From effortlessly organizing events to hassle-free registration and participation, they appreciate the user-friendly interface and comprehensive features that enhance their college experience. With increased attendance and engagement, Amphicraft has become a valuable asset to our campus community.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={3}
            watchSlidesProgress
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="https://pagedone.io/asset/uploads/1704349534.png"
                alt="Emily image"
                className="mx-auto scale-90 transition-all duration-300 border rounded-full border-indigo-600"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://pagedone.io/asset/uploads/1704349572.png"
                alt="Ethan image"
                className="mx-auto scale-90 transition-all duration-300 border rounded-full border-indigo-600"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://pagedone.io/asset/uploads/1704349514.png"
                alt="Olivia image"
                className="mx-auto scale-90 transition-all duration-300 border rounded-full border-indigo-600"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section class="py-20 ">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="bg-indigo-600 rounded-2xl p-8 xl:p-11">
            <h2 class="font-manrope text-4xl text-white text-center font-bold mb-4">
              Subscribe to the latest offer
            </h2>
            <p class="text-indigo-200 text-center mb-11 max-lg:max-w-2xl mx-auto">
              Join our community of subscribers and receive regular updates
              delivered straight to your inbox. It's quick, easy, and free
            </p>
            <div class="max-w-md mx-auto lg:bg-transparent lg:border border-gray-300 rounded-3xl max-lg:py-3 lg:rounded-full lg:h-12 lg:p-1.5 lg:flex-row gap-6 lg:gap-0 flex-col flex items-center justify-between">
              <input
                type="text"
                name="email"
                class="py-2 px-6 bg-transparent rounded-full max-lg:border border-gray-300  text-gray-100 max-lg:text-center placeholder:text-gray-400 focus:outline-none flex-1 w-full lg:w-auto lg:py-2 lg:px-6 lg:bg-transparent"
                placeholder="Enter your email.."
              />
              <button
                type="submit"
                class="py-2 px-5 text-sm bg-indigo-500 shadow-md rounded-full  text-white font-semibold hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

     <Footer/>
    </>
  );
}

export default About;
