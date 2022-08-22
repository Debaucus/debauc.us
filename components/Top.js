import React from "react";

const Top = () => {
  return (
    <>
      <section id="about" class="bg-gray-900">
        <div className="max-w-screen-xl px-8 xl:px-16 mx-auto" id="about">
          <div className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16 ">
            <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                Make it <strong>Work.</strong>
              </h1>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                Make it <strong>Better.</strong>
              </h1>
              <p className="text-black-500 mt-4 mb-6">
                Hi! I am a Fullstack Developer with the unfortunate of hobby spending hours
                solving a problem that would usually take 5 minutes if I just did it.
              </p>
                <p>Below you will find my previous work and my current active projects. I keep this as up to date as possible.</p>
            </div>
            <div className="flex w-full">
              <div className="h-full w-full"></div>
            </div>
          </div>
        </div>
      </section>
      <div class="bg-gray-800">
        <svg viewBox="0 0 1440 320">
          <path
            fill="#111827"
            fill-opacity="1"
            d="M0,224L34.3,234.7C68.6,245,137,267,206,272C274.3,277,343,267,411,229.3C480,192,549,128,617,133.3C685.7,139,754,213,823,234.7C891.4,256,960,224,1029,229.3C1097.1,235,1166,277,1234,282.7C1302.9,288,1371,256,1406,240L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          />
        </svg>
      </div>
    </>
  );
};

export default Top;
