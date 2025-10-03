💻 Contributing to T-Race

First off — thank you for considering contributing to T-Race!
Your ideas, code, and feedback are what make this project thrive.
We’re thrilled to have you join our community of contributors who help make T-Race a faster, more reliable, and enjoyable typing platform for everyone.

This document outlines how to contribute effectively and responsibly.

📜 Code of Conduct

T-Race follows a strict Code of Conduct
.
By participating, you agree to maintain a welcoming, respectful, and inclusive environment for everyone.
If you experience or witness any unacceptable behavior, please report it immediately through the appropriate channels mentioned in the Code of Conduct.

🚀 Getting Started

Here’s how you can set up T-Race on your local machine and start contributing.

1. Fork the Repository

Click the “Fork” button at the top right of the T-Race repository page
 to create your personal copy.

2. Clone Your Fork

Clone your fork to your local development environment:

git clone https://github.com/[your-username]/t-race.git
cd t-race


🧩 Replace [your-username] with your GitHub username.

3. Install Dependencies

Use npm (or yarn) to install project dependencies:

npm install

4. Start the Development Server

Run the project locally:

npm run dev


Now visit http://localhost:3000
 in your browser — you should see T-Race running! 🎉
You’re ready to start making improvements or new features.

🧭 Finding a Way to Contribute

There are many ways to contribute to T-Race, including:

🐛 Fixing bugs

🧩 Adding new features

✏️ Improving documentation

🧹 Refactoring code

🧪 Writing or improving tests

🔍 Check Existing Issues

You can start by exploring open issues:

All Issues: Open Issues

Good First Issues: Beginner-friendly issues

💡 Tip: If you’re new, start with a “good first issue” to get familiar with our codebase and workflow.

🧠 Suggesting a New Feature or Reporting a Bug

If something’s missing or broken, open a new issue and include:

A clear title and description

Steps to reproduce (if it’s a bug)

Expected vs. actual behavior

Screenshots or logs (if helpful)

(Optional) Possible solution ideas

🌿 Creating Your Contribution (Pull Request Workflow)

Once you’ve chosen an issue or idea to work on, follow these steps:

1. Create a New Branch

Always create a new branch before starting your work:

git checkout -b feat/add-user-profile


✅ Use descriptive branch names, e.g.:

feat/add-leaderboard

fix/typo-in-navbar

refactor/improve-timer-logic

2. Make Your Changes

Make your improvements — whether that’s code, docs, or UI tweaks.

Follow project coding standards (linting, naming conventions, file structure).

3. Run Tests (If Available)

Ensure all tests pass before committing your changes:

npm test


⚠️ If you’re adding a new feature, consider writing corresponding test cases.

4. Commit Your Changes

Write clean and meaningful commit messages using the Conventional Commits standard.

git add .
git commit -m "feat: add leaderboard component to track typing results"


Refer to Commit Message Guidelines
 below.

5. Push to Your Fork

Push your branch to your forked repository:

git push origin feat/add-user-profile

6. Open a Pull Request (PR)

Head over to your fork on GitHub — you’ll see a “Compare & pull request” button.
Click it and fill out the PR form carefully:

Add a clear title and description

Reference related issue(s) using keywords like:

Closes #23 or Fixes #14

Explain what and why you changed

Attach screenshots or GIFs if your changes are visual

Check all tasks in the PR template before submitting

🕒 PR reviews may take time — please be patient.
A maintainer will review, suggest improvements if necessary, and merge it once ready.

📝 Commit Message Guidelines

We use the Conventional Commits
 convention.

Format
<type>: <short summary>

Common Types
Type	Description
feat	Add a new feature
fix	Fix a bug or issue
docs	Documentation updates only
style	Formatting or styling (no logic change)
refactor	Code restructuring without changing functionality
test	Add or fix tests
chore	Maintenance tasks like config updates, dependency changes, etc.
Examples

✅ Good Commit Messages

feat: implement leaderboard component

fix: resolve timer reset bug after restart

docs: update setup instructions for contributors

refactor: optimize typing speed calculation

🚫 Bad Commit Messages

update file

fixed stuff

changes

🧩 Tip: Make each commit small, atomic, and focused on a single purpose.

🧪 Code Style & Standards

To maintain code consistency, follow these general rules:

Use Prettier for formatting (npm run format if available)

Keep code clean and readable

Avoid committing large, unrelated changes

Follow React & Next.js best practices

Comment only when necessary — prefer self-explanatory code

🧰 Additional Tips

Keep your fork in sync with the main repository:

git remote add upstream https://github.com/your-org/t-race.git
git fetch upstream
git merge upstream/main


Always pull the latest changes before starting a new branch.

Be respectful and collaborative in discussions.

Celebrate your contributions — every PR counts 🎉

❤️ Thank You

Your contributions are what make T-Race possible.
No contribution is too small — whether you’re fixing a typo, improving documentation, or building a new feature.

We truly appreciate your time, ideas, and effort in helping the project grow.

Happy coding, and welcome to the T-Race community! 🚀