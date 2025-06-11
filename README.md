# 🐾 Pokedex UI Workshop

A modern Pokémon web app built with Next.js, TypeScript, and DynamoDB—ideal for learning how to integrate AWS DynamoDB with a React-based stack. Docker is used to run DynamoDB locally for development convenience.

---

## 📂 Repository Structure

```
pokedex-ui-workshop/
├── public/                # Public assets
├── src/
│   ├── app/               # Next.js 13+ App Router
│   ├── components/        # Reusable UI components
│   ├── lib/               # Helpers tools (e.g. DynamoDB client)
│   ├── pages/             # Legacy Pages Router routes (if any)
│   └── model/             # The types
├── pokemons.json          # Sample data for DynamoDB seeding
├── send-to-api.js         # Sample script to seed or fetch data
├── next.config.mjs        # Vercel/Next.js config
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies & scripts
└── README.md              # ← You're here
```

---

## 🚀 Features

- Next.js full‑stack app with client- and server-side rendering
- TypeScript for safety and autocomplete
- DynamoDB as a NoSQL database
- Local DynamoDB via Docker for offline development
- Sample seeding script (`send-to-api.js`)
- Sleek, responsive UI showcasing Pokémon data

---

## 🛠️ Prerequisites

- Node.js >= 18

---

## 🔧 Local Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Gabi1213/pokedex-ui-workshop.git
   cd pokedex-ui-workshop
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```


3. **Seed the database**  
   ```bash
   node send-to-api.js
   ```
   This script reads `pokemons.json` and adds it to DynamoDB.

4. **Run the dev server**  
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Then visit [http://localhost:3000](http://localhost:3000).

---

## 📦 Production & Deployment

To use real AWS:

1. Configure your AWS credentials (via AWS CLI or env vars).
2. Ensure the DynamoDB table exists in your AWS account.
3. Run:
   ```bash
   npm run build
   npm start
   ```
4. Deploy to Vercel (or any Next.js host) using environment variables for AWS.

---

## 📋 Scripts

| Command                | Description                                             |
|------------------------|---------------------------------------------------------|
| `npm run dev`          | Launches Next.js in dev mode                            |
| `npm run build`        | Builds your app for production                          |
| `npm start`            | Starts the production server                           |
| `node send-to-api.js`  | Seeds DynamoDB with data from `pokemons.json`          |
---

## 🧪 Testing

- Automated tests not included yet.
- You can manually test API routes and UI.
- Try edge cases like navigating to non-existent Pokémon.

---

## 💡 Next Steps

- Add API route pagination
- Integrate external Pokémon API
- Write unit tests (Jest, React Testing Library)
- Add CI/CD with GitHub Actions (lint, test, build, deploy)
- Host DynamoDB in AWS or use localstack

---


## 👤 Author

**Gabi1213** – Happy to chat if you have questions!

---

## 🪪 License

MIT License — feel free to use and adapt this project.
