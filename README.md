# Etsy Keyword Finder

Etsy Keyword Finder is a Next.js application that helps users discover and analyze keywords for Etsy listings. It uses DataForSEO for search data and Anthropic's Claude AI for keyword extraction.

## Features

- Search for Etsy listings based on categories
- Extract keywords from listing titles using AI
- Analyze search volume for extracted keywords
- Display results in an interactive dashboard

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- DataForSEO API credentials
- Anthropic API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/etsy-keyword-finder.git
   cd etsy-keyword-finder
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your API keys:
   ```
   DATAFORSEO_LOGIN=your_dataforseo_login
   DATAFORSEO_PASSWORD=your_dataforseo_password
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```

4. Set up Tailwind CSS:
   ```
   npx tailwindcss init -p
   ```

5. Install Shadcn UI components:
   ```
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add card
   npx shadcn-ui@latest add select
   ```

## Usage

To run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/`: Next.js app directory
  - `api/`: API routes
  - `page.tsx`: Main page component
- `src/components/`: React components
  - `ui/`: UI components including EtsyKeywordFinder
- `src/lib/`: Utility functions and API helpers
  - `dataForSeo.ts`: DataForSEO API integration
  - `claude.ts`: Anthropic Claude API integration
  - `utils.ts`: Utility functions

## Contributing

Contributions to the Etsy Keyword Finder are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/etsy-keyword-finder](https://github.com/yourusername/etsy-keyword-finder)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [DataForSEO](https://dataforseo.com/)
- [Anthropic](https://www.anthropic.com/)
- [Recharts](https://recharts.org/)
