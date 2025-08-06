<p align="center">
  <img src="./public/thyme-manager-header.svg" alt="Thyme Manager header" />
</p>
<h1 align="center"><i>Thyme Manager</i></h1>

<p align="center">
  <a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /></a>
  <a href="https://react.dev"><img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /></a>
  <a href="https://tailwindcss.com"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /></a>
  <a href="https://openai.com"><img alt="OpenAI" src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" /></a>
</p>

## Overview

A modern recipe management application that helps you organize your recipes, plan your weekly meals, and generate AI-powered meal prep plans. Built with Next.js 15 and React 19, it provides an intuitive interface for managing your culinary journey.

## Features

- **Recipe Management**: Store and organize all your favorite recipes in one place
- **Calendar Planning**: Schedule recipes for specific days to plan your weekly meals
- **AI Meal Prep**: Generate personalized meal prep plans using OpenAI integration
- **Shopping Lists**: Automatically generate shopping lists from your scheduled meals
- **Modern UI**: Clean, responsive interface built with Radix UI and Tailwind CSS

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **OpenAI API** - AI-powered meal prep planning
- **Lucide Icons** - Beautiful icon library
- **Zod** - Schema validation

## Requirements

- Node.js 18.0.0 or higher
- OpenAI API key (for meal prep generation)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd recipes
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Add your OpenAI API key to .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Adding Recipes

Navigate to the Recipes tab to add new recipes with ingredients and instructions.

### Planning Meals

Use the Calendar tab to schedule recipes for specific days of the week.

### Generating Meal Prep Plans

Once you have recipes scheduled, go to the Meal Prep tab to generate an AI-powered prep plan that includes:
- Combined shopping list
- Sunday prep instructions
- Daily cooking instructions

## Project Structure

```
recipes/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── actions.js    # Server actions
│   │   ├── layout.js     # Root layout
│   │   └── page.js       # Main page
│   ├── components/       # React components
│   │   ├── CalendarView.js
│   │   ├── MealPrep.js
│   │   ├── RecipesList.js
│   │   └── ui/          # UI components
│   └── lib/             # Utility functions
├── public/              # Static assets
├── package.json
└── README.md
```

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

Run linting:
```bash
npm run lint
```

## Environment Variables

Create a `.env.local` file with:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Contributing

Feel free to submit issues and pull requests to improve the application.

## Notes

- The application uses Next.js 15 with the App Router
- All components use React 19 features
- Tailwind CSS 4 is configured for styling
- OpenAI integration requires a valid API key

## License

MIT - See [LICENSE](./LICENSE) for details

## Authors

[Alice Li](mailto:yunjiaaliceli@gmail.com)
[Jahvon Dockery](mailto:jahvondockery@gmail.com)
[Michael Monaghan](mailto:michael@monaghan.nyc)