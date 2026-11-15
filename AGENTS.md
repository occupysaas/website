# Agent instructions

## Pushing

This repo has two remotes, and every push must go to both:

- `origin` — git@github.com:occupysaas/website.git
- `origin2` — git@github.com:thomasmeadows/occupysaas-website.git

When pushing, run `git push origin main && git push origin2 main`. If either
remote has new commits, fetch and rebase onto them first, then push to both.
