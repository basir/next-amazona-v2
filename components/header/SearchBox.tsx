"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/models/ProductModel";
import useSWR from "swr";
import Image from "next/image";
import ProductItem from "../products/ProductItem";
import { useRouter } from "next/navigation";

export const SearchBox = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchString, setSearchString] = useState("");
  const [openProductInOver, setOpenProductInOver] = useState<
    Product | undefined
  >();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";
  const inputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const { data: categories, error } = useSWR("/api/products/categories");
  const { data: products } = useSWR(
    searchString.length >= 3 ? `/api/products/search/${searchString}` : null
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSearchString("");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const handleSearch = (product: Product) => {
    setSearchString("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    router.push(`/product/${product.slug}`);
  };
  const handleSearchFromIcon = () => {
    setSearchString("");
    let temp = "";
    if (inputRef.current) {
      temp = inputRef.current.value;
      inputRef.current.value = "";
      router.push(`/search?${new URLSearchParams({ q: temp }).toString()}`);
    }
  };

  if (error) return error.message;
  if (!categories) return "Loading...";

  return (
    <>
      <div className="relative">
        <div className="join">
          <input
            ref={inputRef}
            className="join-item input input-bordered w-48"
            placeholder="Search"
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") handleSearchFromIcon();
            }}
          />
          <button className="join-item btn" onClick={handleSearchFromIcon}>
            Search
          </button>
        </div>
      </div>
      {searchString.length >= 3 && (
        <div
          ref={searchResultsRef}
          className="absolute w-64 mh-[300px] bg-white z-10 flex flex-col gap-[4px] "
        >
          <div className="relative">
            {openProductInOver && (
              <div
                className="absolute top-o left-[100%]"
                onMouseEnter={() => {
                  setOpenProductInOver(openProductInOver);
                }}
                onMouseLeave={() => {
                  setOpenProductInOver(undefined);
                }}
                onClick={() => {
                  setSearchString("");
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
              >
                <ProductItem product={openProductInOver} />
              </div>
            )}
          </div>
          {products && products.length > 0 ? (
            products.map((product: Product) => (
              <div
                key={product._id}
                className="w-64 z-11 h-[300px flex flex-row justify-between"
                onMouseEnter={() => {
                  setOpenProductInOver(product);
                }}
                onMouseLeave={() => {
                  setOpenProductInOver(undefined);
                }}
                onClick={() => {
                  handleSearch(product);
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                />
                <h3>{product.name}</h3>
                <h5>${product.price}</h5>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </>
  );
};

const categoriesSelect = ({
  categories,
  category,
}: {
  categories: [];
  category: string;
}) => {
  return (
    <select
      name="category"
      defaultValue={category}
      className="join-item select select-bordered "
    >
      <option value="all">All</option>
      {categories.map((c: string) => (
        <option key={c}>{c}</option>
      ))}
    </select>
  );
};
