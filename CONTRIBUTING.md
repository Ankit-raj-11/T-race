# Contributing to T-Race

First off, thank you for considering contributing to T-Race! We're excited to have you here. Your contributions help make T-Race a better platform for everyone.

This document provides guidelines to help you through the entire contribution process.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Finding Work](#finding-work)
- [Submission Process (Pull Request Flow)](#submission-process-pull-request-flow)
- [Commit Message Format](#commit-message-format)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Coding Standards](#coding-standards)
- [Running Tests](#running-tests)
- [Branch Naming](#branch-naming)
- [Pull Request Checklist](#pull-request-checklist)
- [Review Process & Response Times](#review-process--response-times)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Security Policy](#security-policy)
- [Community & Support](#community--support)
- [License](#license)

## Code of Conduct

This project and everyone participating in it is governed by the [T-Race Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.

## Getting Started

Ready to contribute? Here's how to set up the project on your local machine.

1.  **Fork the Repository**

    Click the "Fork" button at the top right of the [T-Race repository page](https://github.com/your-org/t-race) to create your own copy.

2.  **Clone Your Fork**

    Clone your forked repository to your local machine. Replace `[your-username]` with your actual GitHub username.

    ```bash
    git clone https://github.com/[your-username]/t-race.git
    cd t-race
    ```

3.  **Install Dependencies**

    We use `npm` to manage our project dependencies. Run the following command in the project's root directory:

    ```bash
    npm install
    ```

4.  **Start the Development Server**

    Once the dependencies are installed, you can start the local development server:

    ```bash
    npm run dev
    ```

    This will open the T-Race application in your default web browser, usually at `http://localhost:3000`. You're now ready to start making changes!

## Prerequisites

Before you begin, please ensure you have the following installed:

- Node.js LTS (recommended) or newer
- npm (bundled with Node.js) or `pnpm`/`yarn` if your workflow prefers
- Git 2.30+

You can verify versions with:

```bash
node -v
npm -v
git --version
```

If the project requires environment variables, copy the example file and adjust values as needed:

```bash
cp .env.example .env.local
```

## Finding Work

A great way to start is by tackling an existing issue. We keep a list of open issues that need attention.

-   **All Issues**: You can find the full list of open issues [here](https://github.com/your-org/t-race/issues).
-   **Good First Issues**: For new contributors, we've curated a list of issues that are easier to start with. Look for issues with the [**`good first issue`**](https://github.com/your-org/t-race/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) label.

If you have an idea for a new feature or find a bug that isn't documented, feel free to open a new issue!

## Submission Process (Pull Request Flow)

Once you've made your changes, it's time to submit them for review.

1.  **Create a New Branch**

    Always create a new branch for your changes. This keeps your work organized and separate from the `main` branch.

    ```bash
    git checkout -b your-branch-name
    ```
    (e.g., `git checkout -b feat/add-user-profile` or `git checkout -b fix/login-bug`)

2.  **Make Your Changes**

    Write your code and make your changes.

3.  **Commit Your Changes**

    Commit your changes with a descriptive message. See our [Commit Message Format](#commit-message-format) section below.

    ```bash
    git add .
    git commit -m "feat: Implement user profile page"
    ```

4.  **Push to Your Fork**

    Push your branch to your forked repository on GitHub.

    ```bash
    git push origin your-branch-name
    ```

5.  **Open a Pull Request (PR)**

    Go to the T-Race repository on GitHub. You should see a prompt to create a Pull Request from your recently pushed branch.
    -   Use a clear and descriptive title.
    -   In the PR description, reference the issue you are solving. For example, add `Closes #23` if your PR closes issue number 23. This will automatically link the PR to the issue.
    -   Ensure that any automated tests (if implemented) are passing locally before you submit.
    -   Be patient. A project maintainer will review your PR, provide feedback, and merge it if everything looks good.

## Local Development

- Prefer small, focused changes that are easy to review.
- Keep PRs scoped to a single logical change whenever possible.
- Include screenshots or GIFs for UI changes.

## Coding Standards

We aim for readable, consistent code:

- Follow the existing code style. If the repo includes ESLint/Prettier configs, use them.
- Run formatters and linters before committing:

```bash
npm run lint
npm run format
```

- Add or update tests for any behavior changes.
- Document public-facing changes (README, docs, or comments) when relevant.

## Running Tests

If the repository contains tests, run them locally before opening a PR:

```bash
npm test
```

For projects with type-checking or build steps, also run:

```bash
npm run build
npm run typecheck
```

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This helps us automate changelogs and makes the commit history easier to read.

Your commit message should be structured as follows:
**Common Types:**

-   **feat**: A new feature.
-   **fix**: A bug fix.
-   **docs**: Documentation only changes.
-   **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc).
-   **refactor**: A code change that neither fixes a bug nor adds a feature.
-   **test**: Adding missing tests or correcting existing tests.
-   **chore**: Changes to the build process or auxiliary tools and libraries.

**Examples:**
feat: add results modal after test completion
feat(ui): highlight active step in progress bar
fix(login): handle OAuth token refresh race condition
docs: update contribution guidelines for clarity
chore(deps): bump next.js from 13.5.0 to 13.5.2

## Branch Naming

Use short, kebab-case branch names prefixed by the change type:

- `feat/<short-description>`
- `fix/<short-description>`
- `chore/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

Examples: `feat/add-user-profile`, `fix/login-redirect`, `docs/improve-readme`

## Pull Request Checklist

Before marking your PR ready for review, please confirm:

- Tests pass locally and CI is green
- Linting and formatting have been run
- New code includes tests where appropriate
- Breaking changes are clearly called out in the description
- UI-affecting changes include screenshots/GIFs
- PR description links related issues (e.g., `Closes #123`)

## Review Process & Response Times

- Maintainers aim to review PRs within a few business days.
- Expect actionable, constructive feedback. Please be responsive to review comments.
- If your PR is blocked, consider splitting it into smaller pieces.

## Issue Reporting Guidelines

When opening an issue, please include:

- A concise title and clear description
- Steps to reproduce (if bug)
- Expected vs. actual behavior
- Environment details (OS, browser/runtime, versions)
- Screenshots or logs where helpful

Before filing, search existing issues to avoid duplicates.

## Security Policy

If you believe you have found a security vulnerability, please do not open a public issue. Instead, email the maintainers at `security@your-org.example` with details and steps to reproduce. We will acknowledge your report and work with you on a fix.

## Community & Support

Have questions or want to propose ideas?

- Start a discussion in GitHub Discussions (if enabled)
- Join our community channel (e.g., Slack/Discord) if available
- For general inquiries, open an issue with the `question` label

## License

By contributing, you agree that your contributions will be licensed under the repository's license. See [LICENSE](./LICENSE) for details.