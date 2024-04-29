import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link} from "react-router-dom";
import Footer from "../Footer/Footer";
AOS.init({
  duration: 900,
});
export default function Home() {
  const theme = useSelector((state) => state.auth.newTheme); // Get theme from Redux store
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const originalText =
    "Where the convergence of creativity and technology brings events to life. Led by the visionary minds of Abhay, Mohit, Hemant, and Pankaj, we invite you to immerse yourself in a world where participation is just a click away. Explore our virtual realm, where not only do we curate unforgettable experiences, but you can also become an active participant in the magic. Let's embark on this journey together, where every event is an opportunity to make memories and connections that last a lifetime";

  useEffect(() => {
    const elems = document.querySelectorAll(".contanier1 .part2 .elem");

    let animationDelay = 0;

    const interval = setInterval(() => {
      elems.forEach((elem, index) => {
        setTimeout(() => {
          elem.classList.add("increase-size");
          setTimeout(() => {
            elem.classList.remove("increase-size");
          }, 500); // Adjust duration for decrease animation
        }, animationDelay + index * 500); // Adjust the delay between each element
      });

      animationDelay += elems.length * 500;
    }, animationDelay);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < originalText.length) {
        setText((prevText) => prevText + originalText[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setText("");
        setIndex(0);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className="contanier1" data-aos="fade-up" data-aos-offset="0">
          <div className="part1">
            <div class="card">
              <div class="content">
                <div class="e-card playing">
                  <div class="image"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="infotop">
                    <p>
                      Transforming moments into unforgettable memories - where
                      every event becomes a masterpiece.
                    </p>
                    <div class="name">- by Our Team</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contanier2" data-aos="fade-up" data-aos-offset="100">
          <div class="card">
            <p>
              <span>
                <img
                  src="images/one.jpg"
                  alt=""
                />
              </span>
            </p>
            <p>
              <span>
                <img src="images/two.jpg" alt="" />
              </span>
            </p>
            <p>
              <span>
                <img src="images/three.jpg" alt="" />
              </span>
            </p>
            <p>
              <span>
                <img src="images/Slide1.jpg" alt="" />
              </span>
            </p>
            <p>
              <span>
                <img src="images/Slide2.jpg" alt="" />
              </span>
            </p>
            <p>
              <span>
                <img src="images/Slide3.jpg" alt="" />
              </span>
            </p>
          </div>
        </div>
        <div className="contanier9" data-aos="fade-up">
          <div class="notification">
            <div class="notiglow"></div>
            <div class="notiborderglow"></div>
            <div class="notititle">Welcome To Amphcraft</div>
            <div class="notibody">{text}</div>
          </div>
        </div>
        <div className="contanier12">
          <div className="part1" data-aos="fade-up">
            <h1>Ready to Participate in Events ?</h1>
            <Link to={'/login'}><button>GET STARTED NOW</button></Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
