"use client";

import Link from "next/link";

export default function Unauthorized() {
  return (
    <section className="h-screen bg-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
              <h1 className="flex justify-center text-black font-bold text-lg">
                <Link href="/">Nothing to see here. Mooove along now.</Link>
              </h1>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center hover:cursor-pointer">
                <img
                  src="https://media.istockphoto.com/id/1368587762/photo/mature-cow-black-and-white-looking-weird-oncoming-at-the-right-side-at-background-a-green.jpg?s=612x612&w=0&k=20&c=lObNdlxSCdsk57NU9dGBN70jJOGCI33kMMH61qWyKAU="
                  alt="Surprised Cow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
