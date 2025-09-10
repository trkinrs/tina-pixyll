import type { Collection } from "tinacms";

const Post: Collection = {
  name: "post",
  label: "Posts",
  path: "_posts",
  defaultItem: () => ({
    layout: "post",
  }),
  ui: {
    filename: {
      readonly: false, // so we can correct non asci
      slugify: (values) => {
        const date = values?.date
          ? new Date(values.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0]; // fallback: today
        const slug = values?.title
          ? values.title.toLowerCase().replace(/\s+/g, "-")
          : "untitled";
        return `${date}-${slug}`;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "layout",
      label: "Layout",
      options: ["page", "post"],
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "image",
      name: "image",
      label: "Image",
      // @ts-ignore
      uploadDir: () => "posts",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};

export default Post;
