import { Octokit } from "octokit";

export interface GitHubCommitResponse {
  code: string;
  error?: string;
}

export async function fetchCodeFromGitHub(
  url: string,
  githubToken?: string
): Promise<GitHubCommitResponse> {
  try {
    // Validate GitHub URL
    const match = url.match(
      /github\.com\/([^\/]+)\/([^\/]+)\/commit\/([0-9a-f]{40})/i
    );
    
    if (!match) {
      return { code: "", error: "Invalid GitHub commit URL" };
    }

    const [, owner, repo, sha] = match;
    
    const octokit = new Octokit({
      auth: githubToken
    });

    // Get commit details
    const commitResponse = await octokit.rest.repos.getCommit({
      owner,
      repo,
      ref: sha
    });

    // Get changed files
    const files = commitResponse.data.files;
    if (!files || files.length === 0) {
      return { code: "", error: "No files changed in this commit" };
    }

    // Get file contents
    let combinedCode = "";
    for (const file of files) {
      if (file.status === "removed") continue;
      
      const contentResponse = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: file.filename,
        ref: sha
      });

      if ("content" in contentResponse.data) {
        const content = atob(contentResponse.data.content);
        combinedCode += `\n\n// File: ${file.filename}\n${content}`;
      }
    }

    return { code: combinedCode.trim() };
  } catch (error) {
    console.error("Error fetching GitHub commit:", error);
    return { 
      code: "", 
      error: error instanceof Error ? error.message : "Failed to fetch GitHub commit" 
    };
  }
}