# Create Web5

## Introduction

A project scaffolding tool for Web5.

1. Clone the repo
2. Run `node . ../my-app`
3. Follow the prompts

Alternatively you can pass in options to `node . my-app`.

Options:
- `-t` or `--template` to select which template to use. (eg. `--template=template-vanilla`)
- `-s` or `--sync` to describe how often your local and remote DWNs should sync. Set to any value accepted by [`Web5.connect()`](https://github.com/TBD54566975/web5-js?tab=readme-ov-file#web5connectoptions). Falls back to the same Web5 defaults. (eg. `--sync=5m`)
- `-e` or `--endpoints` to set the created DID's service endpoints. Set to any value accepted by [`Web5.connect()`](https://github.com/TBD54566975/web5-js?tab=readme-ov-file#web5connectoptions). Separate multiple endpoints with a comma (eg. `--endpoints=https://dwn.tbddev.org/dwn0,https://dwn.tbddev.org/dwn3`). Falls back to the same Web5 defaults.
- `-ex` or `--example` to use existing example projects from the [web5 documentation](https://github.com/TBD54566975/developer.tbd.website/tree/main/examples/tutorials). Accepts values that match the folder name of the projects e.g run `node . --example book-reviews ../my-app`

Supported templates include:
- `template-vanilla-vite-ts`
  - Includes [Vite](https://vitejs.dev/) and [Typescript](https://www.typescriptlang.org/) out-of-the-box.

Supported examples include:
- `book-reviews`
- `todo-completed`
- `dinger-completed`
- `shared-todo-completed`

Note: Command will be replaced with `npm create @web5/latest`

### TODO:
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Fill out how to: install prereqs, build, test, run, access CI, chat, discuss, file issues

## Project Resources

| Resource                                   | Description                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------- |
| [CODEOWNERS](./CODEOWNERS)                 | Outlines the project lead(s)                                                  |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | Expected behavior for project contributors, promoting a welcoming environment |
| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Developer guide to build, test, run, access CI, chat, discuss, file issues    |
| [GOVERNANCE.md](./GOVERNANCE.md)           | Project governance                                                            |
| [LICENSE](./LICENSE)                       | Apache License, Version 2.0                                                   |
