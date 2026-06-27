import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@komorebi/types", "@komorebi/database"],
};

export default config;
