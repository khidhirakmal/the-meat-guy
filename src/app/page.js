"use client";

import { GlobalContext } from "@/GlobalContext";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  // console.log(products);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="text-black max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Hello, nice to meat you!
            </h1>
            <div className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg ">
              <p>
                At The Meat Guy, we are not your typical butchery. We are the
                meaty mavericks who take your taste buds on an unforgettable
                joyride through the carnivore's paradise.
              </p>
              <br />
              <p>
                We're the folks who bring the flavor, the fun, and a touch of
                comedy to your kitchen. Our meat may not tell jokes, but we've
                got the juiciest punchlines in town.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wider text-white 
              rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-neutral-500 duration-300"
            >
              GIMME MY MEAT NOW!
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="Gimme My Meat"
            />
          </div>
        </div>
        {/* SPACE */}
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8"></div>
        {/* SHOP BY CATEGORY */}
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">
              SHOP BY CATEGORY
            </h2>
          </div>
          {/* CATEGORIES */}
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            {/* LAMB */}
            <li>
              <div
                className="relative block group hover:cursor-pointer hover:brightness-105"
                onClick={() => router.push("/product/listing/lamb")}
              >
                <img
                  src="https://www.simplyrecipes.com/thmb/oAlJf5c1EQExU3iYIGTPRlmtF-4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2013__02__Rosemary-Lamb-Chops-LEAD-2-4b70775441df47848c0b4352446bac77.jpg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-start p-6">
                  <h3 className="text-xl font-medium text-white bg-gray-800/50 p-2 rounded-2xl">
                    LAMB
                  </h3>
                </div>
              </div>
            </li>
            {/* CHICKEN */}
            <li>
              <div
                className="relative block group hover:cursor-pointer hover:brightness-105"
                onClick={() => router.push("/product/listing/chicken")}
              >
                <img
                  src="https://media.istockphoto.com/id/502474519/photo/homemade-grilled-barbecue-chicken.jpg?s=612x612&w=0&k=20&c=5wm-TATH7AH8n77VLfl3CY_CCGeP94TjqrsgB1rXpOg="
                  className="object-cover w-full aspect-square"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-start p-6 ">
                  <h3 className="text-xl font-medium text-white bg-gray-800/50 p-2 rounded-2xl">
                    CHICKEN
                  </h3>
                </div>
              </div>
            </li>
            {/* BEEF */}
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div
                className="relative block group hover:cursor-pointer hover:brightness-105"
                onClick={() => router.push("/product/listing/beef")}
              >
                <img
                  src="https://playswellwithbutter.com/wp-content/uploads/2022/05/Perfect-Grilled-Steak-Butter-Basted-with-Herb-Brush-26.jpg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-start p-6 ">
                  <h3 className="text-xl font-medium text-white bg-gray-800/50 p-2 rounded-2xl">
                    BEEF
                  </h3>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
