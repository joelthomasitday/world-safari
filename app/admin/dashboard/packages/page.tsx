"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface Package {
  _id: string;
  title: string;
  duration: string;
  price: number;
  isActive: boolean;
  createdAt: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/packages`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch packages");
      }
      
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const token = localStorage.getItem("admin_token");
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/packages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete package");
      }

      toast.success("Package deleted successfully");
      fetchPackages(); // Refresh the list
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Packages</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all tour packages
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/dashboard/packages/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Package
          </Link>
        </Button>
      </div>

      {/* Packages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Packages</CardTitle>
          <CardDescription>
            A list of all tour packages available on your platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <PackagesTableSkeleton />
          ) : packages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-4">No packages found</p>
              <Button asChild variant="outline">
                <Link href="/admin/dashboard/packages/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first package
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packages.map((pkg) => (
                      <TableRow key={pkg._id}>
                        <TableCell className="font-medium">
                          {pkg.title}
                        </TableCell>
                        <TableCell>{pkg.duration}</TableCell>
                        <TableCell>{formatPrice(pkg.price)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={pkg.isActive ? "default" : "secondary"}
                          >
                            {pkg.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link
                                href={`/admin/dashboard/packages/${pkg._id}/edit`}
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <DeletePackageDialog
                              packageTitle={pkg.title}
                              onConfirm={() => handleDelete(pkg._id)}
                              isDeleting={deletingId === pkg._id}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {packages.map((pkg) => (
                  <Card key={pkg._id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{pkg.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {pkg.duration}
                          </p>
                        </div>
                        <Badge
                          variant={pkg.isActive ? "default" : "secondary"}
                        >
                          {pkg.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold mb-4">
                        {formatPrice(pkg.price)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <Link
                            href={`/admin/dashboard/packages/${pkg._id}/edit`}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <DeletePackageDialog
                          packageTitle={pkg.title}
                          onConfirm={() => handleDelete(pkg._id)}
                          isDeleting={deletingId === pkg._id}
                          isMobile
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Delete Confirmation Dialog Component
function DeletePackageDialog({
  packageTitle,
  onConfirm,
  isDeleting,
  isMobile = false,
}: {
  packageTitle: string;
  onConfirm: () => void;
  isDeleting: boolean;
  isMobile?: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isMobile ? (
          <Button variant="destructive" size="sm" className="flex-1">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="sr-only">Delete</span>
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the package &quot;{packageTitle}&quot;.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Loading Skeleton Component
function PackagesTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Desktop Skeleton */}
      <div className="hidden md:block space-y-3">
        <div className="flex gap-4 pb-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px] ml-auto" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 py-3 border-t">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-6 w-[70px] rounded-full" />
            <div className="flex gap-2 ml-auto">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Skeleton */}
      <div className="md:hidden space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="h-6 w-[70px] rounded-full" />
              </div>
              <Skeleton className="h-6 w-[80px]" />
              <div className="flex gap-2">
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 flex-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
