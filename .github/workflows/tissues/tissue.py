import os
from github import Github

# Authentifizierung mit einem GitHub Token
#github_token = os.environ.get('GITHUB_TOKEN')
github_token = "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"
if not github_token:
    raise ValueError("GitHub Token nicht gefunden")

g = Github(github_token)
repo = g.get_repo("Montchy/GitHubBotTest")  # Ersetze durch deinen Benutzernamen und Repositorynamen

def respond_to_issues():
    issues = repo.get_issues(state="open")
    
    for issue in issues:
        author = issue.user.login
        issue_comment = f"Vielen Dank fürs Einreichen, @{author}!"
        issue.create_comment(issue_comment)

if __name__ == "__main__":
    respond_to_issues()
