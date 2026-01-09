import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/api", "/.env"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                crawlDelay: 0,
            },
            {
                userAgent: "Bingbot",
                allow: "/",
                crawlDelay: 1,
            },
            // Block aggressive crawlers
            {
                userAgent: ["AhrefsBot", "SemrushBot", "DotBot"],
                disallow: "/",
            },
        ],
        sitemap: "https://mukesh.adhykri.com/sitemap.xml",
    };
}
