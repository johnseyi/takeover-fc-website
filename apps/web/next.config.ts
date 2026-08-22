import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Local network hosts allowed to load dev resources.
   *
   * Next blocks cross-origin requests to /_next/* in development by default, so
   * opening the dev server from a phone on the same Wi-Fi loads the HTML but not
   * the JS or CSS. The plan calls for a deliberately designed mobile experience
   * (§48), so testing on a real device needs to work.
   *
   * Private LAN ranges only, and development-only — this has no effect on the
   * production build.
   */
  allowedDevOrigins: ["192.168.0.0/16", "10.0.0.0/8", "172.16.0.0/12"],
};

export default nextConfig;
