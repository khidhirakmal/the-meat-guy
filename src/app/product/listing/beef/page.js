import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";
import Link from "next/link";

export default async function BeefProducts() {
  const getAllProducts = await productByCategory("beef");

  return (
    <div>
      <div className="flex text-black justify-center mt-10">
        <div className="flex justify-center mx-auto border-4 rounded-lg">
          <Link
            href="/product/listing/beef"
            className="flex mx-5 hover:font-bold active:text-gray-400"
          >
            Beef
          </Link>
          <Link
            href="/product/listing/lamb"
            className="flex mx-5 hover:font-bold active:text-gray-400"
          >
            Lamb
          </Link>
          <Link
            href="/product/listing/chicken"
            className="flex mx-5 hover:font-bold active:text-gray-400"
          >
            Chicken
          </Link>
        </div>
      </div>
      <CommonListing data={getAllProducts && getAllProducts.data} />;
    </div>
  );
}