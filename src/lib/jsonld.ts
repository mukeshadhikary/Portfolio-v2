import { siteConfig } from "@/lib/constants";

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "image": siteConfig.ogImage,
  "sameAs": [
    siteConfig.links.github,
    siteConfig.links.twitter,
    siteConfig.links.facebook
  ],
  "jobTitle": "Software Developer & E-commerce Innovator",
  "worksFor": {
    "@type": "Organization",
    "name": "Self-Employed"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tokyo",
    "addressCountry": "JP"
  },
  "email": siteConfig.links.email
};
