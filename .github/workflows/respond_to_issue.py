import os
import requests
from github import Github

# GitHub Access Token (Generiere ein Token mit den erforderlichen Berechtigungen)
# ACCESS_TOKEN = os.environ.get('GITHUB_TOKEN')
ACCESS_TOKEN = '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'

# Repository Informationen
REPO_OWNER = 'Montchy'  # Dein GitHub Benutzername
REPO_NAME = 'GitHubBotTest'  # Der Name deines Repositories

# Issue Nachricht
ISSUE_MESSAGE = "Danke für das Einreichen des Problems!"

def main():
    # Initialisiere die GitHub API
    g = Github(ACCESS_TOKEN)
    repo = g.get_repo(f"{REPO_OWNER}/{REPO_NAME}")

    # Erhalte die Issue-Nummer aus der Umgebungsvariable
    issue_number = os.environ.get('ISSUE_NUMBER')
    
    # Antworte auf das Issue
    issue = repo.get_issue(int(issue_number))
    issue.create_comment(ISSUE_MESSAGE)

if __name__ == "__main__":
    main()
