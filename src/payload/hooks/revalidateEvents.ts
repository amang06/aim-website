import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Event } from "../../../payload-types";

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Revalidate the specific event page if it's published
    if (doc.status === "published") {
      const path = `/events/${doc.slug}`;
      payload.logger.info(`Revalidating event at path: ${path}`);
      revalidatePath(path);
    }

    // If the event was previously published but now unpublished, revalidate the old path
    if (previousDoc?.status === "published" && doc.status !== "published") {
      const oldPath = `/events/${previousDoc.slug}`;
      payload.logger.info(`Revalidating old event at path: ${oldPath}`);
      revalidatePath(oldPath);
    }

    // Always revalidate the events listing page and homepage when events change
    payload.logger.info("Revalidating events listing page and homepage");
    revalidatePath("/events");
    revalidatePath("/");

    // Revalidate tags for sitemap and other cached content
    revalidateTag("events-sitemap");
    revalidateTag("homepage-events");
  }

  return doc;
};

export const revalidateEventDelete: CollectionAfterDeleteHook<Event> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Revalidate the specific event page
    const path = `/events/${doc?.slug}`;
    payload.logger.info(`Revalidating deleted event at path: ${path}`);
    revalidatePath(path);

    // Revalidate events listing page and homepage
    payload.logger.info(
      "Revalidating events listing page and homepage after deletion"
    );
    revalidatePath("/events");
    revalidatePath("/");

    // Revalidate tags
    revalidateTag("events-sitemap");
    revalidateTag("homepage-events");
  }

  return doc;
};
