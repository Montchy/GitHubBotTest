import os
import json
from gidgethub import GitHubException


def main():
    try:
        issue_comment = """
        Thank you for creating this issue! We appreciate your feedback. 👍
        
        If you have any questions or need further assistance, feel free to ask.
        """

        github_token = os.getenv("GITHUB_TOKEN")
        repo = os.getenv("GITHUB_REPOSITORY")
        
        # Retrieve issue number from the event payload
        with open(os.getenv("GITHUB_EVENT_PATH"), "r") as event_file:
            event_data = json.load(event_file)
            issue_number = event_data["issue"]["number"]

        g = GitHubException(github_token)
        repo_obj = g.get_repo(repo)
        issue_obj = repo_obj.get_issue(issue_number)
        issue_obj.create_comment(issue_comment)
    except Exception as e:
        print(f"An error occurred: {e}")
        exit(1)

if __name__ == "__main__":
    main()
