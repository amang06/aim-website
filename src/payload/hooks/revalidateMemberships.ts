import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Membership } from "../../../payload-types";

export const revalidateMembership: CollectionAfterChangeHook<Membership> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Log the membership changes
    if (previousDoc && previousDoc.price !== doc.price) {
      payload.logger.info(
        `Membership price updated: ${doc.type} from ₹${previousDoc.price} to ₹${doc.price}`
      );
    }

    // Revalidate all pages that display membership pricing
    payload.logger.info("Revalidating membership pricing pages");

    // Main membership pages
    revalidatePath("/membership");
    revalidatePath("/membership/type");
    revalidatePath("/membership/apply");
    revalidatePath("/membership/eligibility");

    // API endpoint for membership prices
    revalidatePath("/api/memberships/prices");

    // Revalidate tags for cached content
    revalidateTag("membership-prices");
    revalidateTag("membership-sitemap");
  }

  return doc;
};

export const revalidateMembershipDelete: CollectionAfterDeleteHook<
  Membership
> = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Membership deleted: ${doc?.type}`);

    // Revalidate all membership-related pages
    payload.logger.info(
      "Revalidating membership pages after membership deletion"
    );

    revalidatePath("/membership");
    revalidatePath("/membership/type");
    revalidatePath("/membership/apply");
    revalidatePath("/membership/eligibility");

    // API endpoint
    revalidatePath("/api/memberships/prices");

    // Revalidate tags
    revalidateTag("membership-prices");
    revalidateTag("membership-sitemap");
  }

  return doc;
};
