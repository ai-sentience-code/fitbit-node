const fetch = require('node-fetch');
const FitbitApiClient = require('./fitbit-api-client');

// URL of the Swagger JSON that lists every Fitbit Web API endpoint
const API_SPEC_URL = 'https://dev.fitbit.com/build/reference/web-api/explore/fitbit-web-api-swagger.json';

// Fetch the Swagger specification and print each endpoint with its HTTP method.
async function listEndpoints() {
  const res = await fetch(API_SPEC_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch spec: ${res.status}`);
  }
  const spec = await res.json();
  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const method of Object.keys(methods)) {
      console.log(`${method.toUpperCase()} ${path}`);
    }
  }
}

// Example helper that demonstrates how you might call an endpoint using the
// FitbitApiClient. Replace accessToken and parameters as needed.
async function exampleCall(path, method, accessToken) {
  const client = new FitbitApiClient({ clientId: 'YOUR_CLIENT_ID', clientSecret: 'YOUR_CLIENT_SECRET' });
  if (method === 'get') {
    return client.get(path, accessToken);
  } else if (method === 'post') {
    return client.post(path, accessToken, {});
  } else if (method === 'put') {
    return client.put(path, accessToken, {});
  } else if (method === 'delete') {
    return client.delete(path, accessToken);
  } else {
    throw new Error(`Unsupported method: ${method}`);
  }
}

if (require.main === module) {
  listEndpoints().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
