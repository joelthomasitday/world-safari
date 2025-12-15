"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageForm } from "@/components/package-form";

interface EditPackagePageProps {
  params: Promise<{ slug: string }>;
}

export default function EditPackagePage({ params }: EditPackagePageProps) {
  const { slug } = use(params);

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
        <h1 className="text-3xl font-bold tracking-tight">Edit Package</h1>
        <p className="text-muted-foreground mt-1">
          Update the details of this tour package
        </p>
      </div>

      {/* Package Form in Edit Mode */}
      <PackageForm packageId={slug} />
    </div>
  );
}
