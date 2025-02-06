import path from "path";

export default {
  root: "src",
  publicDir: "../static",
  resolve: {
    alias: {
      "@scripts": path.resolve(__dirname, "src/scripts"),
    },
  },
  build: {
    outDir: "../dist",
  },
};
