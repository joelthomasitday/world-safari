export const siteConfig = {
  floatingActions: {
    bookOnline: {
      label: "Book Online",
      subtext: "Available 24/7",
      phone: "+919947247200",
      whatsapp: "919947247200",
      icon: "phone",
    },
    quickEnquiry: {
      label: "Quick Enquiry",
      action: "redirect", // 'redirect' | 'modal' | 'form'
      target: "/contact#contact-form",
      icon: "message",
    },
  },
};

export type SiteConfig = typeof siteConfig;
