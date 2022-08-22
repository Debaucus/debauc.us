import React from "react";
import Layout from "../../components/Layout/Layout";

const Debaucus = () => {
  return (
    <>
      <Layout>
        <section id="about" class="bg-gray-900">
          <div className="w-1/2 m-auto">
            <h1 className="text-6xl text-center py-6">
              A case study on self-improvement.
            </h1>
            <p className="py-2">
              Making a portfolio website, and more over what to build it with,
              is a difficult decision. I have worked with many different types
              of languages, frameworks and design philosophys and this is some
              of the reasons I settled on using what you see before you:
            </p>
            <ul>
              <li className="py-2">
                1) <div className="font-bold inline">Tailwind.</div> Designing within the code classes itself and keeping
                CSS extremely minimal is a huge plus.
              </li>
              <li className="py-2">
                2) <div className="font-bold inline">NodeJS.</div> After building a few minor apps within NodeJS, I fell in
                love and haven't looked back.
              </li>
              <li className="py-2">
                3) <div className="font-bold inline">Cloudflare Pages.</div> Now this one is a little harder to pin-point.
                I could have continued using my standard hosting practice and
                host my own website, so why? Try something new and see how it works, that's why!
              </li>
              <li className="py-2">
                4) <div className="font-bold inline">NextJS Framework.</div> Originally I wanted to get into learning React as a framework, but it lacks the cache and aggresive SEO features that a website builder like myself seeks. I want to see what NextJS can do for me going forward.
              </li>
            </ul>
            <p classname="py-2">This project runs on a mix of generation and static content. Each blog posts content (like this one) is all manually entered into each page as there is no database to pull from and the content won't be edited my if ever.</p>
            <p className="py-2">However, the content on the homepage is created using a loop script to place each of the details required for each post. The makes adding new ones far easier and also allows for quick changes to be applied to the design of the site!</p>
          </div>
        </section>
        <section>

        </section>
      </Layout>
    </>
  );
};

export default Debaucus;
