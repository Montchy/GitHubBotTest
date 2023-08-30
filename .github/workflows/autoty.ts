import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { cleanBody } from "./bug_issue";
import { identify } from "./checkissues";

async function run() {
  try {
    let issueComment = ` Placeholder `;

    const githubToken = process.env.TOKEN;
    if (!githubToken) {
      throw new Error("GitHub token not available.");
    }

    const octokit = getOctokit(githubToken);

    const issueNumber = context.payload.issue?.number;
    const repository = process.env.GITHUB_REPOSITORY;

    if (!issueNumber) {
      throw new Error("Issue number not available.");
    }

    if (!repository) {
      throw new Error("Repository information not available.");
    }

    const [owner, repo] = repository.split("/");

    const issue = await octokit.rest.issues.get({
      owner: owner,
      repo: repo,
      issue_number: issueNumber,
    });

    const title = issue.data.title;
    const body = issue.data.body;
    const ss = issue.data.labels.toString();

    console.log("/////////////////////");
    identify(title);
    console.log("/////////////////////");
    const c = cleanBody(title, body + "");
    console.log(c + "!!!!!!!!!!!!!!!!");

    await octokit.rest.issues.createComment({
      owner: owner,
      repo: repo,
      issue_number: issueNumber,
      body: issueComment,
    });

    console.log("Comment created successfully.");
  } catch (error: any) {
    // Specify the type as 'any'
    core.setFailed(`An error occurred (end): ${error.message}`);
  }
}

run();
