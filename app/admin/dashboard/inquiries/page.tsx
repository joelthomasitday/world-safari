"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle, Trash2, Mail, Phone, MapPin, Users, Calendar, MessageSquare } from "lucide-react";

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

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  travelDates?: {
    startDate?: string;
    endDate?: string;
  };
  numberOfPeople?: number;
  message?: string;
  handled: boolean;
  createdAt: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/inquiries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleMarkAsHandled = async (id: string) => {
    try {
      setProcessingId(id);
      const token = localStorage.getItem("admin_token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/inquiries/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update enquiry");
      }

      // Update UI instantly
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id ? { ...inquiry, handled: true } : inquiry
        )
      );

      toast.success("Enquiry marked as handled");
    } catch (error) {
      console.error("Error updating inquiry:", error);
      toast.error("Failed to update enquiry");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setProcessingId(id);
      const token = localStorage.getItem("admin_token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/inquiries/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete enquiry");
      }

      // Update UI instantly
      setInquiries((prev) => prev.filter((inquiry) => inquiry._id !== id));

      toast.success("Enquiry deleted successfully");
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      toast.error("Failed to delete enquiry");
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTravelDates = (travelDates?: { startDate?: string; endDate?: string }) => {
    if (!travelDates?.startDate) return "Not specified";
    
    const start = new Date(travelDates.startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    
    if (!travelDates.endDate) return start;
    
    const end = new Date(travelDates.endDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Enquiries</h1>
          <p className="text-muted-foreground mt-1">
            View and respond to customer enquiries
          </p>
        </div>
        {!loading && (
          <div className="flex gap-2">
            <Badge variant="outline" className="text-sm">
              {inquiries.filter((i) => !i.handled).length} Pending
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {inquiries.filter((i) => i.handled).length} Handled
            </Badge>
          </div>
        )}
      </div>

      {/* Inquiries Content */}
      <Card>
        <CardHeader>
          <CardTitle>All Enquiries</CardTitle>
          <CardDescription>
            Customer enquiries are sorted by most recent first
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <InquiriesTableSkeleton />
          ) : inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-1">No enquiries yet</h3>
              <p className="text-muted-foreground">
                When customers submit enquiries, they will appear here
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Travel Dates</TableHead>
                      <TableHead>People</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) => (
                      <TableRow key={inquiry._id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{inquiry.name}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {inquiry.email}
                            </div>
                            {inquiry.phone && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {inquiry.phone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {formatTravelDates(inquiry.travelDates)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {inquiry.numberOfPeople || "-"}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(inquiry.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={inquiry.handled ? "default" : "secondary"}
                            className={inquiry.handled ? "bg-green-600 hover:bg-green-700" : ""}
                          >
                            {inquiry.handled ? "Handled" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {!inquiry.handled && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleMarkAsHandled(inquiry._id)}
                                disabled={processingId === inquiry._id}
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="sr-only">Mark as handled</span>
                              </Button>
                            )}
                            <DeleteInquiryDialog
                              inquiryName={inquiry.name}
                              onConfirm={() => handleDelete(inquiry._id)}
                              isDeleting={processingId === inquiry._id}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {inquiries.map((inquiry) => (
                  <Card key={inquiry._id}>
                    <CardContent className="pt-6">
                      {/* Header with name and status */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{inquiry.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(inquiry.createdAt)}
                          </p>
                        </div>
                        <Badge
                          variant={inquiry.handled ? "default" : "secondary"}
                          className={inquiry.handled ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {inquiry.handled ? "Handled" : "Pending"}
                        </Badge>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${inquiry.email}`} className="hover:underline">
                            {inquiry.email}
                          </a>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${inquiry.phone}`} className="hover:underline">
                              {inquiry.phone}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Travel Details */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{inquiry.numberOfPeople ? `${inquiry.numberOfPeople} people` : "-"}</span>
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatTravelDates(inquiry.travelDates)}</span>
                        </div>
                      </div>

                      {/* Message */}
                      {inquiry.message && (
                        <div className="mb-4 p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-2 mb-1 text-sm font-medium">
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </div>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {inquiry.message}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!inquiry.handled && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleMarkAsHandled(inquiry._id)}
                            disabled={processingId === inquiry._id}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            {processingId === inquiry._id ? "Processing..." : "Mark as Handled"}
                          </Button>
                        )}
                        <DeleteInquiryDialog
                          inquiryName={inquiry.name}
                          onConfirm={() => handleDelete(inquiry._id)}
                          isDeleting={processingId === inquiry._id}
                          isMobile
                          fullWidth={inquiry.handled}
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
function DeleteInquiryDialog({
  inquiryName,
  onConfirm,
  isDeleting,
  isMobile = false,
  fullWidth = false,
}: {
  inquiryName: string;
  onConfirm: () => void;
  isDeleting: boolean;
  isMobile?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isMobile ? (
          <Button 
            variant="destructive" 
            size="sm" 
            className={fullWidth ? "flex-1" : ""}
          >
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
            This will permanently delete the enquiry from &quot;{inquiryName}&quot;.
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
function InquiriesTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Desktop Skeleton */}
      <div className="hidden lg:block space-y-3">
        <div className="flex gap-4 pb-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[140px]" />
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px] ml-auto" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 py-3 border-t items-center">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[160px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[130px]" />
            <Skeleton className="h-4 w-[40px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-6 w-[70px] rounded-full" />
            <div className="flex gap-2 ml-auto">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Skeleton */}
      <div className="lg:hidden space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="h-6 w-[70px] rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full col-span-2" />
              </div>
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
