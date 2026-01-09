import { siteConfig } from "@/lib/constants";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}#person`,
      "name": siteConfig.name,
      "url": siteConfig.url,
      "image": {
        "@type": "ImageObject",
        "url": siteConfig.ogImage,
        "width": 1200,
        "height": 630
      },
      "description": siteConfig.description,
      "sameAs": [
        siteConfig.links.github,
        siteConfig.links.twitter,
        siteConfig.links.facebook,
        siteConfig.links.email
      ],
      "jobTitle": "Software Developer & E-commerce Innovator",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance Developer",
        "url": siteConfig.url
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tokyo",
        "addressRegion": "Tokyo",
        "addressCountry": "JP",
        "streetAddress": "Tokyo, Japan"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": siteConfig.links.whatsapp,
        "contactType": "Customer Support",
        "email": siteConfig.links.email,
        "availableLanguage": ["en", "ja", "ne"]
      },
      "knowsAbout": [
        "Web Development",
        "Full-Stack Development",
        "E-commerce Solutions",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Python",
        "Cloud Solutions",
        "AWS",
        "Docker",
        "API Development"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Full Stack Web Development",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Industry Experience"
          }
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}#website`,
      "url": siteConfig.url,
      "name": siteConfig.name,
      "description": siteConfig.description,
      "inLanguage": "en-US",
      "creator": {
        "@id": `${siteConfig.url}#person`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}#breadcrumbs`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.url
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": `${siteConfig.url}#about`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Skills",
          "item": `${siteConfig.url}#skills`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Projects",
          "item": `${siteConfig.url}#projects`
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Contact",
          "item": `${siteConfig.url}#contact`
        }
      ]
    }
  ]
};
