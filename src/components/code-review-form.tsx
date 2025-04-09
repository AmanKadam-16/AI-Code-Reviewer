import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { reviewCode } from '@/lib/gemini-service';
import { fetchCodeFromGitHub } from '@/lib/github-service';

export function CodeReviewForm() {
  const [apiKey, setApiKey] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [reviewResult, setReviewResult] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setReviewResult('');
    setIsLoading(true);

    try {
      let codeToReview = codeInput;
      
      // Check if input is a GitHub URL
      if (codeInput.includes('github.com')) {
        const githubResponse = await fetchCodeFromGitHub(codeInput, githubToken);
        if (githubResponse.error) {
          setError(githubResponse.error);
          return;
        }
        codeToReview = githubResponse.code;
      }
      
      const result = await reviewCode(codeToReview, apiKey);
      
      if (result.error) {
        setError(result.error);
      } else {
        setReviewResult(result.text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Code Review Tool</CardTitle>
          <CardDescription>
            Paste your git commit link or code snippet below for an expert review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="apiKey" className="text-sm font-medium">
                  Gemini API Key
                </label>
                <a href="https://ai.google.dev/tutorials/setup" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" title="How to get API key">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </a>
              </div>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Your API key is not stored and is only used for this session
              </p>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="githubToken" className="text-sm font-medium">
                    GitHub Token (optional)
                  </label>
                  <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" title="How to create GitHub token">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </a>
                </div>
                <Input
                  id="githubToken"
                  type="password"
                  placeholder="Enter your GitHub token for private repos"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Only needed for private repositories
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="codeInput" className="text-sm font-medium">
                Code or Git Commit Link
              </label>
              <Textarea
                id="codeInput"
                placeholder="Paste your code or git commit link here"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="min-h-[200px] font-mono"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Analyzing...' : 'Review Code'}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 border border-destructive rounded-md bg-destructive/10 text-destructive">
              {error}
            </div>
          )}

          {reviewResult && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Review Results</h3>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(reviewResult);
                    // Show toast notification
                    const toast = document.createElement('div');
                    toast.className = 'fixed bottom-4 right-4 bg-card text-white px-4 py-2 rounded-md shadow-lg';
                    toast.textContent = 'Copied to clipboard!';
                    document.body.appendChild(toast);
                    setTimeout(() => {
                      document.body.removeChild(toast);
                    }, 2000);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy to clipboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4 border rounded-md bg-card">
                <MarkdownRenderer content={reviewResult} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
