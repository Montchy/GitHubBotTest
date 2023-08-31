import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { cleanBodyBug, returnErrorBug } from "./ISSUE_TYPES/bug_issue";
import { identify } from "./UTILS/checkissues";
import {
  cleanBodyFeature,
  returnErrorFeature,
} from "./ISSUE_TYPES/feature_issue";
import {
  cleanBodyQuestion,
  returnErrorQuestion,
} from "./ISSUE_TYPES/question_issue";

async function run() {
  try {
    let issueComment = ` Everything seems to be working :) `;

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
    const cleanBody = cleanBodyQuestion(title, body + "");

    if (identity == "bug") {
      if (returnErrorBug() != "") {
        await octokit.rest.issues.createComment({
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
          body: returnErrorBug(),
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

      if (returnErrorFeature() != "") {
        await octokit.rest.issues.createComment({
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
          body: returnErrorFeature(),
        });

        await octokit.rest.issues.update({
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
          state: "closed", // Set the state to "closed"
        });
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
    if (identity == "question") {
      //TODO

      if (returnErrorQuestion() != "") {
        await octokit.rest.issues.createComment({
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
          body: returnErrorQuestion(),
        });

        await octokit.rest.issues.update({
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
          state: "closed", // Set the state to "closed"
        });
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
    if (identity == "toManyEmojis") {
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
