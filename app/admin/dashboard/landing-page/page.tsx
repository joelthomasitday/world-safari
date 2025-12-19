"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/shared/ImageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SECTIONS = [
  { value: "hero", label: "Hero" },
];

export default function LandingPageCMS() {
  const [section, setSection] = useState("hero");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    bodyText: "",
    mediaUrl: "",
  });

  // Fetch content when section changes
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setFetching(true);
        const res = await fetch(`/api/page-content?pageKey=home`);
        if (!res.ok) throw new Error("Failed to fetch content");
        const data = await res.json();
        
        const sectionData = data.find((d: any) => d.sectionKey === section);
        if (sectionData) {
          setFormData({
            title: sectionData.title || "",
            subtitle: sectionData.subtitle || "",
            bodyText: sectionData.bodyText || "",
            mediaUrl: sectionData.mediaUrl || "",
          });
        } else {
          setFormData({
            title: "",
            subtitle: "",
            bodyText: "",
            mediaUrl: "",
          });
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        toast.error("Failed to load section content");
      } finally {
        setFetching(false);
      }
    };

    fetchContent();
  }, [section]);

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const payload = {
        pageKey: "home",
        sectionKey: section,
        title: formData.title,
        subtitle: formData.subtitle,
        bodyText: formData.bodyText,
        mediaUrl: formData.mediaUrl,
      };
      
      const res = await fetch("/api/page-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (!res.ok) throw new Error("Failed to save content");
      
      toast.success(`${section.toUpperCase()} section updated successfully`);
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Landing Page CMS</h1>
        <p className="text-muted-foreground mt-1">
          Manage the content of your homepage sections
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Section Editor</CardTitle>
          <CardDescription>
            Select a section to edit its content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="section-select">Select Section</Label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger id="section-select">
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent>
                {SECTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter section title"
                disabled={fetching}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Enter section subtitle"
                disabled={fetching}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyText">Body Text</Label>
              <Textarea
                id="bodyText"
                rows={5}
                value={formData.bodyText}
                onChange={(e) => setFormData({ ...formData, bodyText: e.target.value })}
                placeholder="Enter section body text"
                disabled={fetching}
              />
            </div>

            {section === "hero" && (
              <div className="space-y-4">
                <Label>Hero Background Image</Label>
                <ImageUpload
                  value={formData.mediaUrl}
                  onChange={(url) => setFormData({ ...formData, mediaUrl: url })}
                  disabled={fetching}
                />
              </div>
            )}
          </div>

          <Button 
            className="w-full sm:w-auto" 
            onClick={handleSave} 
            disabled={loading || fetching}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
