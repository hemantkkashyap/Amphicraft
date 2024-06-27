import Navbar from "./Navbar";
import Footer from "./Footer";
import AOS from "aos";
AOS.init({
  duration: 1000,
});

const features = [
  {
    name: "Secure Payment",
    description:
      "Complete payments and transactions securely with encrypted payment gateways.",
    icon: "images/payment.webp",
  },
  {
    name: "Support and Help",
    description:
      " Access FAQs and user guides for assistance. Contact support for any issues or inquiries through an integrated support system.",
    icon: "images/help.jpg",
  },
  {
    name: "Mobile-Friendly Design",
    description:
      "Access Amphicraft on any device, whether it’s a desktop, tablet, or mobile phone, with a user-friendly interface.",
    icon: "images/res.webp",
  },
  {
    name: "Advanced security",
    description:
      "Ensure your personal data is protected with robust security measures.",
    icon: "images/sec.webp",
  },
];

const stats = [
  { id: 1, name: "Total Events Hosted", value: "50" },
  { id: 2, name: "Registered Users", value: "200" },
  { id: 3, name: "Events Attended", value: "100" },
];

const videos = [
  {
    path: "images/video1.mp4",
  },
  {
    path: "images/video1.mp4",
  },
  {
    path: "images/video1.mp4",
  },
  {
    path: "images/video1.mp4",
  },
  {
    path: "images/video1.mp4",
  },
  {
    path: "images/video1.mp4",
  },
];
function Home() {
  return (
    <>
      <Navbar />
      {/*Hero Section*/}
      <div className="bg-white" data-aos="fade-up" data-aos-offset="0">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Transforming moments into memories
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Amphicraft revolutionizes event management for students,
                providing a user-friendly platform to discover, register, and
                engage in campus activities.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-[100%] h-auto flex justify-center" data-aos="fade-in" data-aos-offset="0">
        <img className="h-[200px]" src="images/amphicraftgif.gif" alt="" />
      </div>
      {/*Feature Section*/}
      <div className="bg-white py-24 sm:py-32" data-aos="fade-up" data-aos-offset="100">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Simplify Your Event Experience
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
                Amphicraft. Effortlessly manage your event calendar, participate in activities, and stay connected with the vibrant campus community.
            </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl" data-aos="fade-up" data-aos-offset="100">
            <dl className="flex flex-wrap justify-center gap-8 md:gap-20">
                {features.map((feature) => (
                    <div key={feature.name} className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center gap-5">
                        <div className="flex h-24 w-24 items-center justify-center rounded-lg">
                            <img className="rounded h-full" src={feature.icon} alt="" />
                        </div>
                        <div className="text-center text-base font-semibold leading-7 text-gray-900">
                            {feature.name}
                            <div className="mt-2 text-justify text-base leading-7 text-gray-600">
                                {feature.description}
                            </div>
                        </div>
                    </div>
                ))}
            </dl>
        </div>
    </div>
</div>


      {/*stats Section*/}
      <div className="bg-white py-24 sm:py-32" data-aos="fade-up" data-aos-offset="100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base leading-7 text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="flex justify-center gap-10 w-full overflow-x-hidden p-10" data-aos="fade-up" data-aos-offset="100">
    {videos.map((video) => (
        <div
            key={video.path}
            className="flex justify-center items-center w-[250px] h-[150px] rounded-lg overflow-hidden flex-shrink-0"
        >
            <video
                className="w-full -rotate-90"
                src={video.path}
                onClick={(e) => e.target.play()}
            ></video>
        </div>
    ))}
</div>



      {/*Testimonal Section*/}
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8" data-aos="fade-up" data-aos-offset="100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            className="mx-auto h-12"
            src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg"
            alt=""
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                01001000 01100101 01101100 01101100 01101111 00100001 00100001
                00100000 01000101 01110110 01100101 01110010 01111001 01101111
                01101110 01100101
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-20 w-20 rounded-full"
                src="./images/Hemant.jpeg"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">
                  Hemant K Kashyap
                </div>
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-600">Team Leader</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/*Company Section*/}
      <div className="bg-white py-24 sm:py-32" data-aos="fade-up" data-aos-offset="100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
              alt="Reform"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
        </div>
      </div>

      {/*Footer*/}
      <Footer />
    </>
  );
}

export default Home;
