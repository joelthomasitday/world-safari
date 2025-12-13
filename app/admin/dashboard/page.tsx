"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

interface PackageData {
  _id: string;
  title: string;
  isActive: boolean;
  price: string;
  createdAt: string;
}

interface InquiryData {
  _id: string;
  name: string;
  destination: string;
  message: string;
  handled: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const [pkgRes, inqRes] = await Promise.all([
          fetch("/api/packages", { headers }),
          fetch("/api/inquiries", { headers }),
        ]);

        if (pkgRes.ok) {
          const pkgData = await pkgRes.json();
          setPackages(pkgData);
        } else {
            console.error("Failed to fetch packages:", pkgRes.statusText);
        }

        if (inqRes.ok) {
          const inqData = await inqRes.json();
          setInquiries(inqData);
        } else {
             console.error("Failed to fetch inquiries:", inqRes.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  const totalPackages = packages.length;
  const activePackages = packages.filter((p) => p.isActive).length;
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter((i) => !i.handled).length;

  const recentInquiries = inquiries.slice(0, 5);
  // Sort packages by createdAt desc for "Newest Packages"
  const recentPackages = [...packages]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Admin</h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s an overview of your travel platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Packages Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPackages}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available on platform
            </p>
          </CardContent>
        </Card>

        {/* Active Packages Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePackages}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently visible
            </p>
          </CardContent>
        </Card>

        {/* Total Inquiries Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInquiries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All time inquiries
            </p>
          </CardContent>
        </Card>

        {/* Pending Inquiries Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Inquiries</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingInquiries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions / Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>
              Latest inquiries from potential customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.length === 0 ? (
                <p className="text-sm text-muted-foreground">No inquiries yet.</p>
              ) : (
                recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry._id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {inquiry.destination
                          ? `Interested in ${inquiry.destination}`
                          : "General Inquiry"}
                      </p>
                    </div>
                    <Badge variant={inquiry.handled ? "secondary" : "destructive"}>
                      {inquiry.handled ? "Handled" : "Pending"}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Newest Packages</CardTitle>
            <CardDescription>
              Most recently added travel packages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPackages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No packages yet.</p>
              ) : (
                recentPackages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <p className="font-medium">{pkg.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {pkg.price}
                      </span>
                      <Badge variant={pkg.isActive ? "secondary" : "outline"}>
                        {pkg.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
