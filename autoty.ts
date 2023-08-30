import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";

async function run() {
  try {
    const issueComment = `
    Thank you for creating this issue! We appreciate your feedback. 👍

    If you have any questions or need further assistance, feel free to ask.
    `;

    const githubToken = process.env.GITHUB_TOKEN;
    const octokit = getOctokit(githubToken + "");

    const issueNumber = context.payload.issue?.number; // Add "?" for optional chaining
    const repository = process.env.GITHUB_REPOSITORY;

    if (!issueNumber) {
      throw new Error("Issue number not available.");
    }

    if (!repository) {
      throw new Error("Repository information not available.");
    }

    const [owner, repo] = repository.split("/"); // Split owner and repo

    await octokit.rest.issues.createComment({
      owner: owner,
      repo: repo,
      issue_number: issueNumber,
      body: issueComment,
    });

    console.log("Comment created successfully.");
  } catch (error) {
    core.setFailed(`An error occurred: ${error.message}`);
  }
}

run();
