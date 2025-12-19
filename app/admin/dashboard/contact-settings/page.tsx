"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SettingsData {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  whatsappNumber: string;
  businessHoursWeekday: string;
  businessHoursWeekend: string;
  contactFormTitle: string;
  contactFormSubtitle: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  mapEmbedUrl: string;
}

const defaultSettings: SettingsData = {
  companyName: "World Safari Tours",
  address: "",
  phone: "",
  email: "",
  website: "",
  whatsappNumber: "",
  businessHoursWeekday: "9:00 AM - 6:00 PM",
  businessHoursWeekend: "10:00 AM - 2:00 PM",
  contactFormTitle: "Send Us a Message",
  contactFormSubtitle: "Tell us about your dream trip, and we'll make it happen.",
  facebookUrl: "",
  instagramUrl: "",
  twitterUrl: "",
  youtubeUrl: "",
  mapEmbedUrl: "",
};

export default function ContactSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<SettingsData>(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setFetching(true);
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        
        setFormData({
          companyName: data.companyName || defaultSettings.companyName,
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
          website: data.website || "",
          whatsappNumber: data.whatsappNumber || "",
          businessHoursWeekday: data.businessHoursWeekday || defaultSettings.businessHoursWeekday,
          businessHoursWeekend: data.businessHoursWeekend || defaultSettings.businessHoursWeekend,
          contactFormTitle: data.contactFormTitle || defaultSettings.contactFormTitle,
          contactFormSubtitle: data.contactFormSubtitle || defaultSettings.contactFormSubtitle,
          facebookUrl: data.facebookUrl || "",
          instagramUrl: data.instagramUrl || "",
          twitterUrl: data.twitterUrl || "",
          youtubeUrl: data.youtubeUrl || "",
          mapEmbedUrl: data.mapEmbedUrl || "",
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load settings");
      } finally {
        setFetching(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      
      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof SettingsData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your contact page information and settings
        </p>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            This information appears on your Contact page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                placeholder="World Safari Tours"
                disabled={fetching}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+91 9947247200"
                disabled={fetching}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Office Address</Label>
            <Textarea
              id="address"
              rows={3}
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Enter your full office address"
              disabled={fetching}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="contact@worldsafari.in"
                disabled={fetching}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                placeholder="https://www.worldsafari.in"
                disabled={fetching}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
            <Input
              id="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={(e) => updateField("whatsappNumber", e.target.value)}
              placeholder="919947247200 (without + symbol)"
              disabled={fetching}
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>
            Set your office working hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessHoursWeekday">Mon - Fri</Label>
              <Input
                id="businessHoursWeekday"
                value={formData.businessHoursWeekday}
                onChange={(e) => updateField("businessHoursWeekday", e.target.value)}
                placeholder="9:00 AM - 6:00 PM"
                disabled={fetching}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessHoursWeekend">Sat</Label>
              <Input
                id="businessHoursWeekend"
                value={formData.businessHoursWeekend}
                onChange={(e) => updateField("businessHoursWeekend", e.target.value)}
                placeholder="10:00 AM - 2:00 PM"
                disabled={fetching}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>
            Customize the "Send Us a Message" section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactFormTitle">Form Title</Label>
            <Input
              id="contactFormTitle"
              value={formData.contactFormTitle}
              onChange={(e) => updateField("contactFormTitle", e.target.value)}
              placeholder="Send Us a Message"
              disabled={fetching}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactFormSubtitle">Form Subtitle</Label>
            <Input
              id="contactFormSubtitle"
              value={formData.contactFormSubtitle}
              onChange={(e) => updateField("contactFormSubtitle", e.target.value)}
              placeholder="Tell us about your dream trip..."
              disabled={fetching}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>
            Links to your social media profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl">Facebook URL</Label>
              <Input
                id="facebookUrl"
                value={formData.facebookUrl}
                onChange={(e) => updateField("facebookUrl", e.target.value)}
                placeholder="https://facebook.com/..."
                disabled={fetching}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <Input
                id="instagramUrl"
                value={formData.instagramUrl}
                onChange={(e) => updateField("instagramUrl", e.target.value)}
                placeholder="https://instagram.com/..."
                disabled={fetching}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitterUrl">Twitter URL</Label>
              <Input
                id="twitterUrl"
                value={formData.twitterUrl}
                onChange={(e) => updateField("twitterUrl", e.target.value)}
                placeholder="https://twitter.com/..."
                disabled={fetching}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">YouTube URL</Label>
              <Input
                id="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={(e) => updateField("youtubeUrl", e.target.value)}
                placeholder="https://youtube.com/..."
                disabled={fetching}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Embed */}
      <Card>
        <CardHeader>
          <CardTitle>Google Map</CardTitle>
          <CardDescription>
            Paste your Google Maps embed URL
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="mapEmbedUrl">Map Embed URL</Label>
            <Input
              id="mapEmbedUrl"
              value={formData.mapEmbedUrl}
              onChange={(e) => updateField("mapEmbedUrl", e.target.value)}
              placeholder="https://maps.google.com/maps?q=..."
              disabled={fetching}
            />
          </div>
        </CardContent>
      </Card>


      {/* Save Button */}
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
            Save All Settings
          </>
        )}
      </Button>
    </div>
  );
}
