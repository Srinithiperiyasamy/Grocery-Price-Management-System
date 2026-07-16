"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import api from "@/services/api";
import { Save, X, Loader2 } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nameEnglish: "",
    nameTamil: "",
    productCode: "",
    sellingPrice: "",
    buyingPrice: "",
    unit: "Kg",
    category: "",
    status: "Available",
    stockQuantity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/products", {
        ...formData,
        sellingPrice: Number(formData.sellingPrice),
        buyingPrice: Number(formData.buyingPrice) || 0,
        stockQuantity: Number(formData.stockQuantity) || 0,
      });
      toast.success("Product added successfully!");
      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (error) {
      toast.error("Failed to add product");
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Add New Product</h1>
        <p className="mt-1 text-sm text-slate-500">
          Create a new product in your inventory
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-2xl border border-slate-100 max-w-3xl">
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
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
                className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="-ml-1 mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Save className="-ml-1 mr-2 h-5 w-5" />
              )}
              Save Product
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
