import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { News } from "../../../payload-types";

export const revalidateNews: CollectionAfterChangeHook<News> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Revalidate the specific news page if it's published
    if (doc.status === "published") {
      const path = `/news/${doc.slug}`;
      payload.logger.info(`Revalidating news at path: ${path}`);
      revalidatePath(path);
    }

    // If the news was previously published but now unpublished, revalidate the old path
    if (previousDoc?.status === "published" && doc.status !== "published") {
      const oldPath = `/news/${previousDoc.slug}`;
      payload.logger.info(`Revalidating old news at path: ${oldPath}`);
      revalidatePath(oldPath);
    }

    // Always revalidate the news listing page and homepage when news changes
    payload.logger.info("Revalidating news listing page and homepage");
    revalidatePath("/news");
    revalidatePath("/");

    // Revalidate tags for sitemap and other cached content
    revalidateTag("news-sitemap");
    revalidateTag("homepage-news");
  }

  return doc;
};

export const revalidateNewsDelete: CollectionAfterDeleteHook<News> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Revalidate the specific news page
    const path = `/news/${doc?.slug}`;
    payload.logger.info(`Revalidating deleted news at path: ${path}`);
    revalidatePath(path);

    // Revalidate news listing page and homepage
    payload.logger.info(
      "Revalidating news listing page and homepage after deletion"
    );
    revalidatePath("/news");
    revalidatePath("/");

    // Revalidate tags
    revalidateTag("news-sitemap");
    revalidateTag("homepage-news");
  }

  return doc;
};
