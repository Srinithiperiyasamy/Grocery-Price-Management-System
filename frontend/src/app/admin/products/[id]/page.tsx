"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import api from "@/services/api";
import { Save, X, Loader2 } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    nameEnglish: "",
    nameTamil: "",
    productCode: "",
    sellingPrice: "",
    buyingPrice: "",
    unit: "",
    category: "",
    status: "Available",
    stockQuantity: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products`);
        const product = data.find((p: any) => p._id === id);
        
        if (product) {
          setFormData({
            nameEnglish: product.nameEnglish || "",
            nameTamil: product.nameTamil || "",
            productCode: product.productCode || "",
            sellingPrice: product.sellingPrice || "",
            buyingPrice: product.buyingPrice || "",
            unit: product.unit || "",
            category: product.category || "",
            status: product.status || "Available",
            stockQuantity: product.stockQuantity || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/products/${id}`, {
        ...formData,
        sellingPrice: Number(formData.sellingPrice),
        buyingPrice: Number(formData.buyingPrice) || 0,
        stockQuantity: Number(formData.stockQuantity) || 0,
      });
      toast.success("Product updated successfully!");
      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (error) {
      toast.error("Failed to update product");
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Edit Product</h1>
        <p className="mt-1 text-sm text-slate-500">
          Update the details of an existing product
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-2xl border border-slate-100 max-w-3xl">
        {initialLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Product Name (English)
                </label>
                <input
                  type="text"
                  name="nameEnglish"
                  value={formData.nameEnglish}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Product Name (Tamil)
                </label>
                <input
                  type="text"
                  name="nameTamil"
                  value={formData.nameTamil}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Product Code
                </label>
                <input
                  type="text"
                  name="productCode"
                  value={formData.productCode}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  name="sellingPrice"
                  min="0"
                  step="0.01"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Buying Price (₹)
                </label>
                <input
                  type="number"
                  name="buyingPrice"
                  min="0"
                  step="0.01"
                  value={formData.buyingPrice}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Unit
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="e.g. Kg, Ltr, Packet"
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-slate-900"
                >
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-slate-900"
                />
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex justify-end gap-3">
              <Link
                href="/admin/products"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
              >
                <X className="-ml-1 mr-2 h-5 w-5 text-slate-400" />
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="-ml-1 mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Save className="-ml-1 mr-2 h-5 w-5" />
                )}
                Update Product
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
