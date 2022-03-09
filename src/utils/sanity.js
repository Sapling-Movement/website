const sanityClient = require('@sanity/client');

const baseSettings = {
  projectId: 'b5y7zctp',
  dataset: 'production',
  apiVersion: '2022-03-09',
  useCdn: false,
};

const authenticatedClient = new sanityClient({
  ...baseSettings,
  token: process.env.SANITY_PREVIEW_TOKEN
})

const unauthenticatedClient = new sanityClient(baseSettings);

module.exports = {
  authenticatedClient,
  unauthenticatedClient
}
