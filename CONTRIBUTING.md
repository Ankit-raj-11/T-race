# Contributing to T-Race

First off, thank you for considering contributing to T-Race! We're excited to have you here. Your contributions help make T-Race a better platform for everyone.

This document provides guidelines to help you through the entire contribution process.

## Code of Conduct

This project and everyone participating in it is governed by the [T-Race Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.

## Getting Started

Ready to contribute? Here's how to set up the project on your local machine.

1.  **Fork the Repository**

    Click the "Fork" button at the top right of the [T-Race repository page](https://github.com/your-org/t-race) to create your own copy.

2.  **Clone Your Fork**

    Clone your forked repository to your local machine. Replace `[your-username]` with your actual GitHub username.

    ```bash
    git clone [https://github.com/](https://github.com/)[your-username]/t-race.git
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

## Finding Work

A great way to start is by tackling an existing issue. We keep a list of open issues that need attention.

- **All Issues**: You can find the full list of open issues [here](https://github.com/your-org/t-race/issues).
- **Good First Issues**: For new contributors, we've curated a list of issues that are easier to start with. Look for issues with the [**`good first issue`**](https://github.com/your-org/t-race/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) label.

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
    - Use a clear and descriptive title.
    - In the PR description, reference the issue you are solving. For example, add `Closes #23` if your PR closes issue number 23. This will automatically link the PR to the issue.
    - Ensure that any automated tests (if implemented) are passing locally before you submit.
    - Be patient. A project maintainer will review your PR, provide feedback, and merge it if everything looks good.

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This helps us automate changelogs and makes the commit history easier to read.

Your commit message should be structured as follows:
**Common Types:**

- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation only changes.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc).
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **test**: Adding missing tests or correcting existing tests.
- **chore**: Changes to the build process or auxiliary tools and libraries.

**Examples:**
feat: Add results modal after a test is completed
fix: Correct typo in the README.md file
docs: Update contribution guidelines for clarity
