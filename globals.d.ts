// Ambient declarations for side-effect asset imports (e.g. `import "./globals.css"`).
// TypeScript 6+ requires these for side-effect imports of non-code modules;
// Next.js processes the actual files at build time.
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
