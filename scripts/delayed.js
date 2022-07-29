// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './helix-web-library.esm.js';
import { render } from './storefront-sdk-widget.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
// Initialize storefront-sdk
const options = {
  endpoint: 'https://helix-ystxy6i-egytbxb7cxneo.us-4.magentosite.cloud/graphql',
  mesh: 'storefrontstaticenvmesh',
};
render(options, document.body);
