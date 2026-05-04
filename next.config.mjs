const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repository = (process.env.GITHUB_REPOSITORY ?? '').trim();
const repoParts = repository.split('/');
const hasValidRepo = repoParts.length === 2 && repoParts[0] && repoParts[1];
const repoName = hasValidRepo ? repoParts[1] : '';

if (isGithubActions && !hasValidRepo) {
  throw new Error(
    `GITHUB_REPOSITORY is '${repository || 'undefined'}' but must be in format 'owner/repo' to deploy to GitHub Pages.`
  );
}

const basePath = isGithubActions ? `/${repoName}` : '';

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
