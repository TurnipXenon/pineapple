#!/bin/bash
# update-check-snapshot.sh: Regenerate the svelte-check baseline count and error snapshot.
#
# Run this when you intentionally want to accept the current errors as the new baseline:
#   pnpm check-snapshot
#
# Commit both scripts/svelte-check-baseline and scripts/svelte-check-known-errors.txt afterward.

set -e

BASELINE_FILE="scripts/svelte-check-baseline"
SNAPSHOT_FILE="scripts/svelte-check-known-errors.txt"
PROJECT_NAME=$(basename "$(pwd)")

# Generate Paraglide files (gitignored, produced by the Vite plugin at runtime)
pnpm exec paraglide-js compile --project ./project.inlang --outdir ./src/lib/external/paraglide

# svelte-kit sync is required before svelte-check
pnpm exec svelte-kit sync

echo "Running svelte-check..."
OUTPUT=$(NO_COLOR=1 pnpm exec svelte-check --tsconfig ./tsconfig.json 2>&1 || true)

# Normalize paths for cross-platform consistency:
#   - backslash → forward slash (Windows)
#   - strip absolute prefix up to project root (e.g. /home/runner/work/pineapple/pineapple/)
NORMALIZED=$(echo "$OUTPUT" | sed 's/\\/\//g' | sed "s|.*/${PROJECT_NAME}/||g")

echo "$NORMALIZED"

ERROR_COUNT=$(echo "$NORMALIZED" | grep -oE 'svelte-check found [0-9]+ errors?' | grep -oE '[0-9]+' | tail -1)

if [ -z "$ERROR_COUNT" ]; then
  echo "Error: Could not parse error count from svelte-check output." >&2
  exit 1
fi

echo "$ERROR_COUNT" > "$BASELINE_FILE"
echo "$NORMALIZED" > "$SNAPSHOT_FILE"

echo ""
echo "Updated:"
echo "  $BASELINE_FILE → $ERROR_COUNT errors"
echo "  $SNAPSHOT_FILE → snapshot saved"
echo ""
echo "Commit both files to lock in the new baseline."
