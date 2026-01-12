---
description: How to deploy this application to GitHub Pages
---

This workflow guides you through initializing a Git repository, pushing it to GitHub, and deploying it to GitHub Pages using the `gh-pages` package.

## Prerequisites
- A GitHub account
- Source code in the current directory

## Steps

1.  **Initialize Git**
    Initialize a new git repository in your project folder.
    ```bash
    git init
    ```

2.  **Commit Changes**
    Stage and commit all your files.
    ```bash
    git add .
    git commit -m "Initial commit"
    ```

3.  **Create a GitHub Repository**
    Create a new repository on GitHub. You can do this via the website or using the GitHub CLI (`gh`).
    *   **Website**: Go to [github.com/new](https://github.com/new). Name it `ai-automation-portfolio`.
    *   **CLI**: Run `gh repo create ai-automation-portfolio --public --source=. --remote=origin`

4.  **Connect to Remote**
    *If you created the repo via the website*, add the remote origin (replace `YOUR_USERNAME` with your actual username):
    ```bash
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/ai-automation-portfolio.git
    ```

5.  **Push Code**
    Push your code to the main branch.
    ```bash
    git push -u origin main
    ```

6.  **Deploy to GitHub Pages**
    We will use the `gh-pages` package to deploy easily.

    a.  **Install `gh-pages`**
    ```bash
    // turbo
    npm install -D gh-pages
    ```

    b.  **Update `package.json`**
    Add the `homepage` field and deployment scripts. Update `YOUR_USERNAME` and `REPO_NAME`.
    
    *Open `package.json` and add:*
    ```json
    "homepage": "https://YOUR_USERNAME.github.io/ai-automation-portfolio",
    "scripts": {
      ...
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

    c.  **Update `vite.config.ts`**
    Set the base path for proper asset loading.
    
    *Open `vite.config.ts` and add `base`:*
    ```typescript
    export default defineConfig({
      base: '/ai-automation-portfolio/',
      // ...
    })
    ```

    d.  **Deploy**
    Run the deploy script.
    ```bash
    npm run deploy
    ```

7.  **Verify**
    Visit your GitHub Pages URL (e.g., `https://YOUR_USERNAME.github.io/ai-automation-portfolio`). enable Pages in Settings > Pages if needed (Source: `gh-pages` branch).
