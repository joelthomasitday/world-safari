"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Upload, X, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Zod schema for form validation
const packageFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  duration: z.string().min(1, "Duration is required (e.g., 4N/5D)"),
  price: z.string().min(1, "Price is required"),
  overview: z.string().min(10, "Overview must be at least 10 characters"),
  itinerary: z.array(z.string()).min(1, "At least one day itinerary is required"),
  inclusions: z.array(z.string()).min(1, "At least one inclusion is required"),
  exclusions: z.array(z.string()).min(1, "At least one exclusion is required"),
  visa: z.string().optional(),
  bestTime: z.string().min(1, "Best time to visit is required"),
  images: z.array(z.string()).optional(),
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

// Default values for creating a new package
const defaultValues: Partial<PackageFormValues> = {
  title: "",
  duration: "",
  price: "",
  overview: "",
  itinerary: [""],
  inclusions: [""],
  exclusions: [""],
  visa: "",
  bestTime: "",
  images: [],
};

// Best time options
const bestTimeOptions = [
  "January - March",
  "April - June",
  "July - September",
  "October - December",
  "Year Round",
];

interface PackageFormProps {
  packageId?: string; // If provided, form is in edit mode
}

export function PackageForm({ packageId }: PackageFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const isEditMode = !!packageId;

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues,
  });

  // Fetch package data if in edit mode
  const fetchPackage = useCallback(async () => {
    if (!packageId) return;
    
    try {
      setIsFetching(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/packages/${packageId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch package");
      }

      const data = await response.json();
      
      // Populate form with fetched data
      form.reset({
        title: data.title || "",
        duration: data.duration || "",
        price: data.price?.toString() || "",
        overview: data.overview || "",
        itinerary: data.itinerary?.length > 0 ? data.itinerary : [""],
        inclusions: data.inclusions?.length > 0 ? data.inclusions : [""],
        exclusions: data.exclusions?.length > 0 ? data.exclusions : [""],
        visa: data.visa || "",
        bestTime: data.bestTime || "",
        images: data.images || [],
      });
      
      setImageUrls(data.images || []);
    } catch (error) {
      console.error("Error fetching package:", error);
      toast.error("Failed to load package data");
      router.push("/admin/dashboard/packages");
    } finally {
      setIsFetching(false);
    }
  }, [packageId, form, router]);

  useEffect(() => {
    fetchPackage();
  }, [fetchPackage]);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      const token = localStorage.getItem("admin_token");
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      const newImages = [...imageUrls, ...uploadedUrls];
      setImageUrls(newImages);
      form.setValue("images", newImages);
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload some images");
    } finally {
      setUploadingImages(false);
      // Reset input
      e.target.value = "";
    }
  };

  // Remove an uploaded image
  const removeImage = (index: number) => {
    const newImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImages);
    form.setValue("images", newImages);
  };

  // Handle form submission
  const onSubmit = async (values: PackageFormValues) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("admin_token");

      const url = isEditMode
        ? `${process.env.NEXT_PUBLIC_API_BASE}/packages/${packageId}`
        : `${process.env.NEXT_PUBLIC_API_BASE}/packages`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          images: imageUrls,
        }),
      });

      if (!response.ok) {
        throw new Error(
          isEditMode ? "Failed to update package" : "Failed to create package"
        );
      }

      toast.success(
        isEditMode
          ? "Package updated successfully"
          : "Package created successfully"
      );
      router.push("/admin/dashboard/packages");
    } catch (error) {
      console.error("Error saving package:", error);
      toast.error(
        isEditMode ? "Failed to update package" : "Failed to create package"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic field array handlers
  const addArrayField = (fieldName: "itinerary" | "inclusions" | "exclusions") => {
    const currentValues = form.getValues(fieldName);
    form.setValue(fieldName, [...currentValues, ""]);
  };

  const removeArrayField = (
    fieldName: "itinerary" | "inclusions" | "exclusions",
    index: number
  ) => {
    const currentValues = form.getValues(fieldName);
    if (currentValues.length > 1) {
      form.setValue(
        fieldName,
        currentValues.filter((_, i) => i !== index)
      );
    }
  };

  const updateArrayField = (
    fieldName: "itinerary" | "inclusions" | "exclusions",
    index: number,
    value: string
  ) => {
    const currentValues = form.getValues(fieldName);
    const newValues = [...currentValues];
    newValues[index] = value;
    form.setValue(fieldName, newValues);
  };

  if (isFetching) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading package data...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic details of the tour package
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Magical Dubai Experience" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 4N/5D" {...field} />
                    </FormControl>
                    <FormDescription>Format: Nights/Days</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1299" type="text" {...field} />
                    </FormControl>
                    <FormDescription>Price in USD</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bestTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Best Time to Visit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select best time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bestTimeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief overview of the tour package..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visa Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter visa requirements and information..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Itinerary */}
        <Card>
          <CardHeader>
            <CardTitle>Day-wise Itinerary</CardTitle>
            <CardDescription>
              Add the itinerary for each day of the tour
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="itinerary"
              render={() => (
                <FormItem>
                  {form.watch("itinerary").map((_, index) => (
                    <div key={index} className="flex gap-2 mb-3">
                      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-medium text-sm">
                        D{index + 1}
                      </div>
                      <Textarea
                        placeholder={`Day ${index + 1} activities...`}
                        className="min-h-[60px]"
                        value={form.watch(`itinerary.${index}`)}
                        onChange={(e) =>
                          updateArrayField("itinerary", index, e.target.value)
                        }
                      />
                      {form.watch("itinerary").length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayField("itinerary", index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <FormMessage />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayField("itinerary")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Day
                  </Button>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Inclusions & Exclusions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Inclusions */}
          <Card>
            <CardHeader>
              <CardTitle>Inclusions</CardTitle>
              <CardDescription>What&apos;s included in the package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="inclusions"
                render={() => (
                  <FormItem>
                    {form.watch("inclusions").map((_, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="e.g., Airport transfers"
                          value={form.watch(`inclusions.${index}`)}
                          onChange={(e) =>
                            updateArrayField("inclusions", index, e.target.value)
                          }
                        />
                        {form.watch("inclusions").length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeArrayField("inclusions", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <FormMessage />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField("inclusions")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Inclusion
                    </Button>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Exclusions */}
          <Card>
            <CardHeader>
              <CardTitle>Exclusions</CardTitle>
              <CardDescription>What&apos;s not included in the package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="exclusions"
                render={() => (
                  <FormItem>
                    {form.watch("exclusions").map((_, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="e.g., Travel insurance"
                          value={form.watch(`exclusions.${index}`)}
                          onChange={(e) =>
                            updateArrayField("exclusions", index, e.target.value)
                          }
                        />
                        {form.watch("exclusions").length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeArrayField("exclusions", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <FormMessage />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField("exclusions")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Exclusion
                    </Button>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Package Images</CardTitle>
            <CardDescription>
              Upload images for the tour package (stored on Cloudinary)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Image Upload Zone */}
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={uploadingImages}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {uploadingImages ? (
                  <>
                    <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Uploading images...
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 10MB each
                    </span>
                  </>
                )}
              </label>
            </div>

            {/* Image Previews */}
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg overflow-hidden border bg-muted"
                  >
                    {url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={url}
                        alt={`Package image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/dashboard/packages")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : isEditMode ? (
              "Update Package"
            ) : (
              "Create Package"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
