import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "132c309f-d005-4144-a431-e253aba9d67d", // Get this from tina.io
  token: "eac9b055011cdeb611b3424d39e06980661b633e", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public/images",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public/images",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
