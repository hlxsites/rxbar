// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './helix-web-library.esm.js';
import { render } from './storefront-sdk-widget.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
// Initialize storefront-sdk
const options = {
  endpoint: 'https://graph.adobe.io/api/63e62e43-8eb8-45a2-b0f6-f7c3845093db/graphql?api_key=2c6d06bb3aef463db8485c88a90f563f',
  mesh: 'storefrontstaticenvmesh',
};
render(options, document.body);
