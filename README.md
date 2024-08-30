
Clone the repository (if you have one) or create a new Next.js project:
Copynpx create-next-app@latest etsy-keyword-finder
cd etsy-keyword-finder

Install the required dependencies:
Copynpm install @anthropic-ai/sdk@0.18.0 @radix-ui/react-select axios recharts

Install dev dependencies:
Copynpm install -D autoprefixer postcss tailwindcss

Set up Tailwind CSS:
Copynpx tailwindcss init -p

Install Shadcn UI components:
Copynpx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add select

Create a .env file in the root directory and add your API keys:
CopyDATAFORSEO_LOGIN=your_dataforseo_login
DATAFORSEO_PASSWORD=your_dataforseo_password
ANTHROPIC_API_KEY=your_anthropic_api_key

Run the development server:
Copynpm run dev

Open your browser and navigate to http://localhost:3000
