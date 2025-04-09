# AI Code Reviewer

A powerful tool that leverages Google's Gemini AI to provide expert code reviews for your projects. Supports direct code input or GitHub repository links.

## Features

- **Advanced AI Analysis**: Powered by Google's Gemini 1.5 model with 1M token context window, enabling deep analysis of large codebases
- **Comprehensive Code Review**: Get detailed feedback on code quality, architecture, potential bugs, security vulnerabilities, performance optimizations, and best practices
- **Multi-Language Support**: Analyzes code in all major programming languages with understanding of language-specific idioms and patterns
- **GitHub Integration**: Analyze code directly from GitHub repositories (supports both public and private repos)
- **Markdown Support**: Review results are formatted in markdown for better readability
- **Secure**: Your API keys and tokens are never stored

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Get a [Google Gemini API key](https://ai.google.dev/)
4. (Optional) For private GitHub repos, generate a [GitHub personal access token](https://github.com/settings/tokens)

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open the app in your browser
3. Enter your Gemini API key
4. (Optional) Add GitHub token for private repos
5. Paste your code or GitHub URL
6. Click "Review Code" to get expert feedback

## Development

To contribute to this project:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Google Gemini API
- GitHub API

## License

MIT
