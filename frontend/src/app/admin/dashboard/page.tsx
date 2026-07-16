"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import api from "@/services/api";
import { Package, CheckCircle, XCircle, TrendingUp } from "lucide-react";

type Stats = {
  total: number;
  available: number;
  outOfStock: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/products/stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: "Total Products",
      value: stats?.total || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Available Products",
      value: stats?.available || 0,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      name: "Out of Stock",
      value: stats?.outOfStock || 0,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your store's inventory</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.name}
                className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-slate-100 flex items-center"
              >
                <div className={`p-4 rounded-xl ${card.bgColor} mr-6`}>
                  <Icon className={`h-8 w-8 ${card.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 truncate">
                    {card.name}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-slate-900">
                    {card.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Additional dashboard elements like recent updates could go here */}
    </AdminLayout>
  );
}
