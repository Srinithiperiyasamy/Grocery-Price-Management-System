"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/services/api";
import { Search, PackageX, Loader2, Edit, Plus } from "lucide-react";
import Head from "next/head";

type Product = {
  _id: string;
  nameEnglish: string;
  nameTamil?: string;
  productCode?: string;
  sellingPrice: number;
  unit: string;
  status: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let endpoint = "/products";
        if (query.trim()) {
          endpoint = `/products/search?q=${encodeURIComponent(query)}`;
        }
        const { data } = await api.get(endpoint);
        setResults(data);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(fetchProducts, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Product Price Search</title>
        <meta name="description" content="Search product prices instantly" />
      </Head>

      <div className="w-full max-w-7xl flex justify-end gap-2 sm:gap-3 mb-6">
        <a 
          href="/admin/products/new" 
          className="text-xs sm:text-sm font-medium text-white hover:bg-emerald-700 transition-colors bg-emerald-600 px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-sm flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span>
        </a>
        <a 
          href="/admin/dashboard" 
          className="text-xs sm:text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors bg-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-sm border border-slate-100"
        >
          Dashboard
        </a>
      </div>

      <div className="w-full max-w-7xl space-y-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-700 tracking-tight">
            Live Price Check
          </h1>
          <p className="mt-2 sm:mt-4 text-base sm:text-xl text-slate-500">
            Search by English, Tamil, or Product Code
          </p>
        </div>

        <div className="relative rounded-2xl shadow-xl bg-white p-1 sm:p-2 flex items-center focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all">
          <Search className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400 ml-3 sm:ml-4 mr-2" />
          <input
            type="text"
            className="w-full h-14 sm:h-20 text-xl sm:text-3xl px-2 sm:px-4 text-slate-800 placeholder-slate-400 bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="Search Product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {loading && (
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 animate-spin mr-3 sm:mr-4" />
          )}
        </div>

        {/* Results Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {query.trim() && !loading && results.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-8 sm:p-12 bg-white rounded-2xl shadow-sm text-slate-500">
              <PackageX className="h-12 w-12 sm:h-16 sm:w-16 mb-4 text-slate-300" />
              <p className="text-xl sm:text-2xl font-medium text-slate-600">No products found</p>
              <p className="text-sm sm:text-lg mt-1">Try a different search term</p>
            </div>
          )}

          {results.map((product) => (
            <div
              key={product._id}
              className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col justify-between gap-4 h-full"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-700 leading-tight break-words">
                    {product.nameEnglish}
                  </h2>
                  <div className="flex flex-col items-end gap-2 shrink-0 mt-1">
                    {product.productCode && (
                      <span className="text-[10px] sm:text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {product.productCode}
                      </span>
                    )}
                    <a 
                      href={`/admin/products/${product._id}`} 
                      className="text-indigo-600 hover:text-indigo-800 text-[10px] sm:text-xs flex items-center gap-1 font-medium bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100 transition-colors"
                    >
                      <Edit className="h-3 w-3" /> Edit
                    </a>
                  </div>
                </div>
                {product.nameTamil && (
                  <p className="text-base sm:text-lg text-emerald-600 font-medium mt-1">
                    {product.nameTamil}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-50">
                <div className="flex justify-between items-end gap-2">
                  <div className="text-2xl sm:text-3xl font-black text-slate-800 break-words">
                    ₹{product.sellingPrice}{" "}
                    <span className="text-base sm:text-lg font-medium text-slate-500 whitespace-nowrap">
                      / {product.unit}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold shrink-0 ${
                      product.status === "Available"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
