"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, MessageSquare, TrendingUp, Users } from "lucide-react";

// Mock data - replace with actual API calls later
const mockStats = {
  totalPackages: 24,
  totalInquiries: 156,
  pendingInquiries: 12,
  activePackages: 18,
};

export default function DashboardPage() {
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
            <CardTitle className="text-sm font-medium">
              Total Packages
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalPackages}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{mockStats.activePackages} Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Total Inquiries Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inquiries
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalInquiries}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="destructive">{mockStats.pendingInquiries} Pending</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        {/* Active Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Site Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
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
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      Interested in Bali Package
                    </p>
                  </div>
                  <Badge variant={i === 1 ? "destructive" : "secondary"}>
                    {i === 1 ? "New" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Packages</CardTitle>
            <CardDescription>
              Most viewed travel packages this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Bali Adventure", views: 342 },
                { name: "Paris Romance", views: 289 },
                { name: "Tokyo Explorer", views: 256 },
              ].map((pkg) => (
                <div
                  key={pkg.name}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <p className="font-medium">{pkg.name}</p>
                  <span className="text-sm text-muted-foreground">
                    {pkg.views} views
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
