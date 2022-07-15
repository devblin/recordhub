export const OCTOKIT_ROUTES = {
  createRepo: () => `POST /user/repos`,

  commitFile: ({ owner, repo, path }) =>
    `PUT /repos/${owner}/${repo}/contents/${path}`,
};
