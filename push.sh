#!/bin/bash

# ─────────────────────────────────────────────
#  Deomic Portfolio 2.0 — GitHub Push Script
# ─────────────────────────────────────────────

REPO="https://github.com/deomictechnologies-111/portfolio-2.0.git"

echo ""
echo "  Deomic Portfolio 2.0 — Push to GitHub"
echo "  ───────────────────────────────────────"
echo ""

# Remove any existing remote and set the correct one
git remote remove origin 2>/dev/null
git remote add origin "$REPO"

# Rename branch to main
git branch -M main

echo "  → Pushing to $REPO ..."
echo ""

# Push with upstream tracking
git push -u origin main --force

if [ $? -eq 0 ]; then
  echo ""
  echo "  ✅ Done! Live at:"
  echo "  https://github.com/deomictechnologies-111/portfolio-2.0"
  echo ""
else
  echo ""
  echo "  ❌ Push failed. Make sure you're logged into GitHub."
  echo "  Run: gh auth login  (if using GitHub CLI)"
  echo "  Or:  git config --global credential.helper store"
  echo ""
fi
