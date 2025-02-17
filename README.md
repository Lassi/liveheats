# Liveheats Coding Challenge

## Installation

To get started with the project you will need to have:

- a recent version of node (v23.7.0 was used to bootstrap the project)
- pnpm (v10.4.0 was used to bootstrap the project)

Once those prerequisites are fulfilled, you can install the project's dependencies:

```bash
pnpm install
```

After that is done, you should be able to run the server and try the app!

## Running the server

You can run the development server by using this command:

```bash
pnpm run dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Running tests

You can run the test via `pnpm`. The following commands are available:

```bash
# Run all the unit tests
pnpm run test:unit

# Run all the unit tests in watch mode
pnpm run test:unit:watch

# Run test for a specific file in watch mode (useful to develop new features)
pnpm run test:unit:watch path/to/my/file.test.js

# Run all the e2e test
pnpm run test:e2e
```

## Folder structure

The app is a Next.js project so it follows their convention for anything that's in the `src/app` directory.

Aside from that, here's a quick description of the project's structure:
- `src/blocks`: high level components that encapsulate an entire end-user experience (creating a race, viewing a race, ...)
- `src/components`: low level UI components that are shared across blocks
- `src/e2e`: end to end tests, powered by playwright
- `src/lib`: various utilities, used across the entire project
