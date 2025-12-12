"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageForm } from "@/components/package-form";

export default function NewPackagePage() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild>
        <Link href="/admin/dashboard/packages">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Packages
        </Link>
      </Button>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Package</h1>
        <p className="text-muted-foreground mt-1">
          Create a new tour package for your platform
        </p>
      </div>

      {/* Package Form */}
      <PackageForm />
    </div>
  );
}
