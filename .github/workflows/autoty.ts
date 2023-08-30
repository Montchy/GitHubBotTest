import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { cleanBody, returnError } from "./bug_issue";
import { identify } from "./checkissues";

async function run() {
  try {
    let issueComment = ` Everything is works `;

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

    const identity = identify(title);
    const c = cleanBody(title, body + "");

    if (identity == "bug") {
      if (returnError() != "") {
        await octokit.rest.issues.createComment({
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
          body: returnError(),
        });

        await octokit.rest.issues.update({
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
          state: "closed", // Set the state to "closed"
        });

        console.log("Issue closed successfully.");
      } else {
        await octokit.rest.issues.createComment({
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
          body: issueComment,
        });

        console.log("Comment created successfully.");
      }
    }
    if (identity == "feature") {
      //TODO
      console.log(identity);
    }
    if (identity == "question") {
      //TODO
      console.log(identity);
    }
    if (identity == "toManyEmojis") {
      //TODO
      console.log(identity);

      await octokit.rest.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: issueNumber,
        body: "You cannot specify multiple emojis that are there to indicate the type of issue.",
      });

      await octokit.rest.issues.update({
        owner: owner,
        repo: repo,
        issue_number: issueNumber,
        state: "closed", // Set the state to "closed"
      });
    }
    if (identity == "l") {
      //TODO
      console.log(identity);
      console.log("INSIDE L");

      await octokit.rest.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: issueNumber,
        body: "Your title cannot be empty or contain none of the specified emojis.",
      });

      await octokit.rest.issues.update({
        owner: owner,
        repo: repo,
        issue_number: issueNumber,
        state: "closed", // Set the state to "closed"
      });
    }
  } catch (error: any) {
    core.setFailed(`An error occurred (end): ${error.message}`);
  }
}

run();
