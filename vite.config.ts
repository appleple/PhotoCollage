import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// ライブラリビルド設定。
// UMD は従来の dist/photo-collage.bundle.js を維持し、ES 版も併せて出力する。
export default defineConfig({
  // デモは examples/ 配下。配布物（dist）には含めず、dev サーバでのみ参照する。
  // publicDir は使わないため無効化（examples/ のCSSはデモから相対参照する）。
  publicDir: false,
  server: {
    open: "/examples/index.html",
  },
  build: {
    emptyOutDir: true,
    lib: {
      // エントリはプロジェクトルートからの相対パスで解決される
      entry: "src/index.ts",
      name: "PhotoCollage",
      formats: ["umd", "es"],
      fileName: (format) =>
        format === "umd" ? "photo-collage.bundle.js" : "photo-collage.es.js",
    },
    rollupOptions: {
      output: {
        // default export を UMD グローバル（window.PhotoCollage）に直接割り当て、
        // `new PhotoCollage(...)` がそのまま動くようにする。
        exports: "default",
      },
    },
  },
  plugins: [
    dts({
      include: ["src"],
    }),
  ],
});
