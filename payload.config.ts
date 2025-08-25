import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";
import Users from "./src/payload/collections/Users";
import Media from "./src/payload/collections/Media";
import Members from "./src/payload/collections/Members";
import Memberships from "./src/payload/collections/Memberships";
import Events from "./src/payload/collections/Events";
import News from "./src/payload/collections/News";

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Members, Memberships, Events, News],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  // Configure S3 storage for media uploads
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: "media",
        },
      },
      bucket: process.env.S3_BUCKET_NAME || "",
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        },
        region: process.env.AWS_REGION || "",
        // Optional: Configure additional S3 options
        // forcePathStyle: false, // Use virtual-hosted-style URLs (default for AWS S3)
        // endpoint: 'https://s3.amazonaws.com', // Custom endpoint if needed
      },
    }),
  ],
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
});
