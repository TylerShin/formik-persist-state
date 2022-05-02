import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import * as PackageJson from "./package.json";

const peerDependencies = PackageJson.peerDependencies;
const external = Array.from(Object.keys(peerDependencies));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      formats: ["cjs", "umd", "es"],
      name: "FormikPersistState",
      fileName: (format) => `formik-persist-state.${format}.js`,
    },
    rollupOptions: {
      external,
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          formik: "Formik",
        },
      },
    },
  },
});
