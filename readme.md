# Fitbit-Node

Fitbit-Node is a lightweight Node.js client for the [Fitbit Web API](https://dev.fitbit.com/build/reference/web-api/). It provides helpers for performing the OAuth 2.0 flow and convenience wrappers around the HTTP endpoints.

## Installation

```bash
npm install fitbit-node
```

```javascript
const FitbitApiClient = require("fitbit-node");
```

## Creating a client

```javascript
const client = new FitbitApiClient({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  apiVersion: "1.2" // optional, defaults to 1.2
});
```

## API methods

### OAuth helpers

- `getAuthorizeUrl(scope, redirectUrl, [prompt], [state])` – Build the authorization URL for the OAuth 2.0 flow.
- `getAccessToken(code, redirectUrl)` – Exchange an authorization code for an access token.
- `refreshAccessToken(accessToken, refreshToken, [expiresIn])` – Refresh an expired access token.
- `revokeAccessToken(accessToken)` – Revoke an access token when it is no longer needed.

### HTTP helpers

- `get(path, accessToken, [userId], [extraHeaders])` – Perform a GET request.
- `post(path, accessToken, data, [userId], [extraHeaders])` – Perform a POST request.
- `put(path, accessToken, data, [userId], [extraHeaders])` – Perform a PUT request.
- `delete(path, accessToken, [userId], [extraHeaders])` – Perform a DELETE request.

All HTTP helpers resolve with `[body, response]` from the underlying request.

### Calling Fitbit API endpoints

This library does not expose individual functions for each Fitbit endpoint. Instead, use the HTTP helpers with the paths documented by Fitbit. For example, to fetch the user's profile:

```javascript
client.get("/profile.json", accessToken).then(results => {
  console.log(results[0]);
});
```

Refer to the [Fitbit API documentation](https://dev.fitbit.com/build/reference/web-api/) for a complete list of available endpoints and data formats.

### Custom HTTP headers

Some Fitbit API calls (such as [adding subscriptions](https://dev.fitbit.com/docs/subscriptions/#adding-a-subscription)) accept additional HTTP headers. The `get`, `post`, `put` and `delete` functions accept an optional `extraHeaders` parameter which will be merged with the default `Authorization` header.

## Example

See [`example.js`](https://github.com/lukasolson/fitbit-node/blob/master/example.js) for a small Express application demonstrating the OAuth flow and a request to the profile endpoint.

Refer to the [Fitbit API documentation](https://dev.fitbit.com/build/reference/web-api/) for a complete list of available endpoints and data formats.

### Custom HTTP headers

Some Fitbit API calls (such as [adding subscriptions](https://dev.fitbit.com/docs/subscriptions/#adding-a-subscription)) accept additional HTTP headers. The `get`, `post`, `put` and `delete` functions accept an optional `extraHeaders` parameter which will be merged with the default `Authorization` header.

## Example

See [`example.js`](https://github.com/lukasolson/fitbit-node/blob/master/example.js) for a small Express application demonstrating the OAuth flow and a request to the profile endpoint.


## Enumerating all Fitbit API endpoints

If you want to see a list of every available Fitbit API endpoint, run the
`endpoint-list.js` script. This script downloads the official Swagger
specification from Fitbit and prints each path with its HTTP method:

```bash
node endpoint-list.js
```

Use the paths printed by this script with the HTTP helper methods documented
above to call each endpoint as needed.
