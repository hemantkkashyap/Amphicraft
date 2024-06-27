import React , {useEffect}from 'react'
import './Main.css'
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
    duration: 1800,
  });


export default function Main() {
    useEffect(() => {
        const scrollers = document.querySelectorAll('.logoscroller');

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);

                const inner = scroller.querySelector('.scroller_inner');
                const content = Array.from(inner.children);

                content.forEach(item => {
                    const duplicate = item.cloneNode(true);
                    duplicate.setAttribute('aria-hidden', true);
                    inner.appendChild(duplicate);
                });
            });
        }

        addAnimation();
    }, []); 

  return (
    <>
      <section className="contanier">
        <div className="circle1" data-aos="fade-down" data-aos-offset="0"></div>
        <div className="circle2" data-aos="fade-left" data-aos-offset="0"></div>
        <div className="circle3" data-aos="fade-right" data-aos-offset="0"></div>
        <div className="card" id='card1' data-aos="fade-up" data-aos-offset="0" delay="1500"></div>
        <div className="card" id='card2' data-aos="fade-up" data-aos-offset="0" delay="7000"></div>
        <div className="card" id='card3' data-aos="fade-up" data-aos-offset="0" delay="9000"></div>
        <div className="textbox">
            <h1></h1>
        </div>
      </section>

        <section className='features' data-aos="fade-up" data-aos-offset="100">
            <div className="circle"></div>
        <div className="textbox">
            <h1>Your user research Swiss Army knife</h1>
        </div>
        <div className="box"></div>
        <div className="part2">
            <div className="card" data-aos="fade-up" data-aos-offset="100">
                <div className='part1'></div>
                <div className='part22'>
                    <h2>Secure Payment</h2>
                    <p>Discover how people group and label information.</p>
                </div>
                <div className='part3'> Learn More</div>
            </div>
            <div className="card" data-aos="fade-up" data-aos-offset="100">
                <div className='part1'></div>
                <div className='part22'>
                    <h2>Secure Payment</h2>
                    <p>Discover how people group and label information.</p>
                </div>
                <div className='part3'> Learn More</div>
            </div>
            <div className="card" data-aos="fade-up" data-aos-offset="100">
                <div className='part1'></div>
                <div className='part22'>
                    <h2>Secure Payment</h2>
                    <p>Discover how people group and label information.</p>
                </div>
                <div className='part3'> Learn More</div>
            </div>
            <div className="card" data-aos="fade-up" data-aos-offset="100">
                <div className='part1'></div>
                <div className='part22'>
                    <h2>Secure Payment</h2>
                    <p>Discover how people group and label information.</p>
                </div>
                <div className='part3'> Learn More</div>
            </div>
            <div className="card" data-aos="fade-up" data-aos-offset="100">
                <div className='part1'></div>
                <div className='part22'>
                    <h2>Secure Payment</h2>
                    <p>Discover how people group and label information.</p>
                </div>
                <div className='part3'> Learn More</div>
            </div>
            <div className="card" data-aos="fade-up" data-aos-offset="100">
                <div className='part1'></div>
                <div className='part22'>
                    <h2>Secure Payment</h2>
                    <p>Discover how people group and label information.</p>
                </div>
                <div className='part3'> Learn More</div>
            </div>
        </div>
        </section>

        <section className='gallery scroller-active' data-aos="fade-up" data-aos-offset="100">
            <div className="card1" data-aos="fade-right" data-aos-offset="100"></div>
            <div className="card2" data-aos="fade-up" data-aos-offset="100"></div>
            <div className="card3" data-aos="fade-left" data-aos-offset="100"></div>
            <div className="card4" data-aos="fade-right" data-aos-offset="100"></div>
            <div className="card5" data-aos="fade-up" data-aos-offset="100"></div>
            <div className="card6" data-aos="fade-left" data-aos-offset="100"></div>
        </section>

        <section className='logos'>
        <div class="logoscroller">
                <ul class="logo-list scroller_inner">
                    <li>
                        <img class="logo" src="./images/asset 3.png" alt=""/>
                    </li>
                    <li>
                        <img class="logo" src="./images/asset 4.png" alt=""/>
                    </li>
                    <li>
                        <img class="logo" src="./images/asset 5.png" alt=""/>
                    </li>
                    <li>
                        <img class="logo" src="./images/asset 6.png" alt=""/>
                    </li>
                    <li>
                        <img class="logo" src="./images/asset 7.png" alt=""/>
                    </li>
                    <li>
                        <img class="logo" src="./images/asset 8.svg" alt=""/>
                    </li>
                    <li>
                        <img class="logo" src="./images/asset 9.png" alt=""/>
                    </li>
                   
                </ul>
            </div>
        </section>


    </>
  )
}
