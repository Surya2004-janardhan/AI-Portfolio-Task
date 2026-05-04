const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repository = process.env.GITHUB_REPOSITORY ?? '';
const repoSegments = repository.split('/').filter(Boolean);
const repoName = repoSegments.length > 1 ? repoSegments[1] : '';

if (isGithubActions && !repoName) {
  throw new Error('GITHUB_REPOSITORY must be set to "owner/repo" to deploy to GitHub Pages.');
}

const basePath = isGithubActions && repoName ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
