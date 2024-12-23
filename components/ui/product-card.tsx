"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { BackgroundGradient } from "./background-gradient";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className=" backdrop-blur-sm bg-slate-100/5 dark:bg-white/5 group cursor-pointer rounded-[25px] border-slate-600/40 dark:border-white/40 border"
    >
      <BackgroundGradient containerClassName="w-full h-full" className="rounded-[22px] w-full h-full p-3 bg-white dark:bg-zinc-900">
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={data?.images?.[0]?.url}
            fill
            alt="Image"
            className="aspect-square object-cover rounded-md"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <IconButton
                onClick={onPreview}
                icon={
                  <Expand
                    size={20}
                    className="text-gray-600 border-gray-200 dark:border-gray-100 dark:text-white"
                  />
                }
              />
              <IconButton
                onClick={onAddToCart}
                icon={
                  <ShoppingCart
                    size={20}
                    className="text-gray-600 border-gray-200 dark:border-gray-100 dark:text-white"
                  />
                }
              />
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-lg">{data.name}</p>
          <p className="text-sm text-gray-500">{data.category?.name}</p>
        </div>
        <div className="flex items-center justify-between">
          <Currency value={data?.price} />
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default ProductCard;
