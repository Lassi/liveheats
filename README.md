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

## Notes

A couple of notes/thoughts/remarks on this projects:

- You can open the `whiteboard.excalidraw` file using [Excalidraw](https://excalidraw.com/) if you're curious about the initial thinking process that happened when I read the requirement doc
- The app is [accessible online](https://liveheats-rouge.vercel.app/)
- I ran into quite a few issues with playwright which made it hard to write e2e tests properly, especially for the "view race" page. If I had more time I'd have tried to clean up things a bit and refactor the tests to follow the POM pattern and fixtures to make them easier to read/maintain/reuse
- I tried to TDD everything but as a result of me not practicing this in a looong time, one can see that my approach is subpar and the design suffered. It was an interesting exercise though and brought back cool memories.
- If I had more time, I'd have added zod and a form library to make things a bit nicer
- Storing things in the localstorage was a nice option to keep things simple but it's not great. On the bright  side, since Next.js has server components now, it should be possible to reuse this on the server and have the app work across different browser instead of being browser dependent
