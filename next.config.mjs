const isGithubActions = process.env.GITHUB_ACTIONS || false;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGithubActions ? '/AI-Portfolio-Task' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
