module.exports = {
  plugins: ['commitlint-plugin-jira-rules'],
  extends: ['jira'],
  rules: {
    'jira-task-id-separator': [0],
    'jira-task-id-case': [0],
    'jira-task-id-min-length': [0],
    'jira-commit-status-case': [0],
    'header-max-length': [0],
    'jira-task-id-max-length': [0]
  }
}