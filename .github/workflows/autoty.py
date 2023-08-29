
import os
from github import Github
from github.GithubException import GithubException
from github.GithubObject import NotSet

def main():
    try:
        issue_comment = """
        Thank you for creating this issue! We appreciate your feedback. 👍
        
        If you have any questions or need further assistance, feel free to ask.
        """

        github_token = os.getenv("GITHUB_TOKEN")
        repo = os.getenv("GITHUB_REPOSITORY")
        issue_number = os.getenv("GITHUB_EVENT_PATH").split("/")[-1]

        g = Github(github_token)
        repo_obj = g.get_repo(repo)
        issue_obj = repo_obj.get_issue(int(issue_number))
        issue_obj.create_comment(issue_comment)
    except GithubException as e:
        print(f"An error occurred: {e}")
        exit(1)

if __name__ == "__main__":
    main()
