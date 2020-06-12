# Next.js Apollo TypeScript starter with Docker

- [Next.js Apollo TypeScript starter with Docker](#nextjs-apollo-typescript-starter-with-docker)
  - [Development overview](#development-overview)
    - [Features](#features)
      - [Additional features](#additional-features)
    - [Development tooling](#development-tooling)
  - [Getting started](#getting-started)
    - [Start development server](#start-development-server)
    - [Tests](#tests)
  - [Additional helpers](#additional-helpers)
    - [`useAuth()` hook](#useauth-hook)
  - [Docker](#docker)
    - [Compose](#compose)

## Development overview

### Features

- [x] Latest release of [Next.js](https://nextjs.org/blog/next-9-3)
- [ ] [Apollo client v3](https://www.apollographql.com/docs/react/v3.0-beta)
  - [x] Authentication via [JWT](https://jwt.io/)
  - [ ] Persisted queries across requests
- [x] [TypeScript](https://www.typescriptlang.org/)-ready environment
- [x] Sass styling via [@zeit/next-sass](https://github.com/zeit/next-plugins/tree/master/packages/next-sass) plugin
  - [modern-normalize](https://github.com/sindresorhus/modern-normalize) included
- Built-in [helpers](#additional-helpers).
- Custom [Express](https://github.com/expressjs/express/tree/5.0) server

#### Additional features

- [ ] Emotion and Material UI integration

### Development tooling

- [Jest](https://jestjs.io/) using [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- Formatting with [Prettier](https://prettier.io/)
- Debug configuration for [VSCode](https://code.visualstudio.com/).
- [Docker](https://www.docker.com/) configuration to serve **production-ready** build with Nginx.

## Getting started

### Start development server

Before start using project you have to unstall dependencies by running _one of these commands_:

```bash
# If you're using Yarn package mangaer:
yarn

# If you're using NPM package mangaer:
npm install
```

### Tests

We are using [Jest](https://jestjs.io/) for testing. To run tests located in `src/tests` directory use `test:run` script from `package.json`:

```bash
yarn test:run
```

---

Pretty much everything you need to know you can find in [Next.js documentation](https://nextjs.org/docs).

## Additional helpers

### `useAuth()` hook

This hook helps you to implement authentication. Here is an example how to use it:

```tsx
import React from 'react';

import { useAuth } from './utils/auth';

const MyPage = () => {
  const [{ data }, logout] = useAuth();

  return (
    <div>
      {data ? (
        <div>
          <div>Hello, {data.me.name}!</div>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <div>Please sign in</div>
      )}
    </div>
  );
};
```

If you don't want to wrap whole application in authentication environment (for example, you may not want to do any authentication-based requests on `/login` page), you can use `withAuth` HOC on needed pages instead of using `AuthProvider` as global wrapper:

`_app.tsx`:

```diff
import React from 'react';
import App from 'next/app';

import { withApollo } from '../lib/apollo';
- import { AuthProvider } from '../utils/auth';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
-     <AuthProvider>
-       <Component {...pageProps} />
-     </AuthProvider>
+     <Component {...pageProps} />
    );
  }
}

export default withApollo(appWithTranslation(MyApp));
```

Any page that required authentication:

```diff
import React from 'react';
import { NextPage } from 'next';

- import { useAuth } from '../utils/auth';
+ import { useAuth, withAuth } from '../utils/auth';

const AuthenticationRequiredPage: NextPage = () => {
  const [{ data }] = useAuth();

  return <div>Hi, user with ID {data.me.id}!</div>;
};

- export default AuthenticationRequiredPage;
+ export default withAuth(AuthenticationRequiredPage);
```

## Docker

To build and run Dockerized **production-ready** container, run:

```js
yarn container:build
```

Once the image is built, run a container by executing:

```js
yarn container:run
```

### Compose

_Use the following scripts in `package.json` to control your multi-application stack with docker-compose:_

Build a new stack or rebuild an existing stack:

```js
yarn compose:build
```

Launch a built compose stack:

```js
yarn compose:start
```

To launch a built compose stack, run `yarn compose:start`.

```js
./scripts/docker/build.sh
```

Stop the launched stack:

```js
yarn compose:stop
```

Tear down the built stack:

```js
yarn compose:down
```
