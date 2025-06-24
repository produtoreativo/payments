for branch in $(git branch -r | grep -v HEAD); do
  echo "$branch:"
  git ls-tree -r "$branch" --name-only | grep newrelic.js && echo "  ✓ encontrado"
done