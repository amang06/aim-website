import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://aim.ind.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/admin/",
          "/api/debug-member/",
          "/api/member-info/",
          "/api/invoice/",
          "/api/payment/",
          "/membership/pay/",
          "/membership/payment/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
