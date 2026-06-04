# Rushd LLC - Static Website

A premium, highly interactive static landing page for **Rushd LLC** (rushd-ai.com), a specialized consultancy helping small businesses in manufacturing, construction, and contracting automate day-to-day processes using custom artificial intelligence.

## Features

1. **Warm Terracotta & Sand Aesthetic**: A custom, modern light-mode design with warm tones, cozy typography, soft gradients, and glassmorphism.
2. **Interactive AI ROI Calculator**: A dynamic sliding widget where prospective clients can estimate their monthly and annual hours and dollars saved by introducing automation.
3. **Responsive Grid Layout**: Fully optimized for mobile, tablet, and desktop viewports.
4. **Micro-Animations & Transitions**: Smooth scroll fade-ins (using `IntersectionObserver`) and hover interactions.
5. **SEO & Accessibility Ready**: Configured with structural semantic HTML5, descriptive meta tags, and accessible headings.

---

## Local Development

You can run this site locally in several ways:

### Option A: VS Code Live Server (Easiest)
If you use VS Code, install the **Live Server** extension, open this folder, and click **"Go Live"** in the bottom right corner.

### Option B: Python SimpleHTTPServer
If you have Python installed, run one of the following commands in this directory:
```bash
# Python 3
python3 -m http.server 8000
# Python 2
python -m SimpleHTTPServer 8000
```
Then visit `http://localhost:8000` in your browser.

### Option C: Node.js (http-server)
If you have Node.js installed, run:
```bash
npx http-server
```

---

## Free Hosting with Cloudflare Pages

To host this website for **$0/month** on your domain `rushd-ai.com` using Cloudflare Pages, follow these simple steps:

### Step 1: Push Code to GitHub
1. Create a repository on GitHub (it can be private or public).
2. Link your local repository and push:
   ```bash
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Connect to Cloudflare Pages
1. Sign up for a free account at [cloudflare.com](https://www.cloudflare.com/).
2. In the dashboard, navigate to **Compute (Workers & Pages)** &rarr; **Pages** &rarr; **Create a project**.
3. Select **Connect to Git** and choose the repository you just pushed.
4. Set the following configuration details:
   - **Project Name**: `rushd` (or anything you prefer).
   - **Production Branch**: `main`
   - **Framework Preset**: `None` (it's a static site).
   - **Build Command**: Leave blank.
   - **Build Output Directory**: Leave blank (root `./`).
5. Click **Save and Deploy**. Cloudflare will deploy your site in under a minute!

### Step 3: Configure Your Custom Domain (`rushd-ai.com`)
1. In your Cloudflare Pages project, go to the **Custom Domains** tab.
2. Click **Set up a custom domain** and enter `rushd-ai.com` (and `www.rushd-ai.com` if desired).
3. If your domain name servers are already pointed to Cloudflare, Cloudflare will automatically configure the DNS CNAME records for you.
4. If your domain is registered elsewhere (e.g. GoDaddy, Namecheap), follow the simple instructions on screen to add a CNAME record pointing to your Cloudflare Pages URL (e.g. `rushd.pages.dev`).
5. Cloudflare will automatically provision and renew your SSL (HTTPS) certificate for free.
