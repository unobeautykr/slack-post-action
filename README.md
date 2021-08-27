# Usage

```
- name: Post to Slack
  uses: unobeautykr/slack-post-action@v1.6
  with:
    title: Action Succeeded!
    env: dev
    version: v1.0.0
    link: https://github.com/unobeautykr/slack-post-action
    webhookUrl: ${{ secrets.SLACK_WEBHOOK_URL }}
  if: always()
```
