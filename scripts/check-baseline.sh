#!/bin/bash
# check-baseline.sh: Run svelte-check and fail if errors exceed the stored baseline.
#
# When the count exceeds the baseline, diffs current output against the committed
# snapshot (scripts/svelte-check-known-errors.txt) so new errors are easy to spot.
#
# To accept the current errors as the new baseline:
#   pnpm check-snapshot   # updates baseline + snapshot, then commit both

set -e

BASELINE_FILE="scripts/svelte-check-baseline"
SNAPSHOT_FILE="scripts/svelte-check-known-errors.txt"
PROJECT_NAME=$(basename "$(pwd)")

if [ ! -f "$BASELINE_FILE" ]; then
  echo "Error: $BASELINE_FILE not found." >&2
  echo "Run: pnpm check-snapshot" >&2
  exit 1
fi

BASELINE=$(cat "$BASELINE_FILE" | tr -d '[:space:]')
echo "Baseline: $BASELINE errors"

# Generate Paraglide files (gitignored, produced by the Vite plugin at runtime)
pnpm exec paraglide-js compile --project ./project.inlang --outdir ./src/lib/external/paraglide

# svelte-kit sync is required before svelte-check
pnpm exec svelte-kit sync

OUTPUT=$(NO_COLOR=1 pnpm exec svelte-check --tsconfig ./tsconfig.json 2>&1 || true)

# Normalize paths for cross-platform consistency:
#   - backslash → forward slash (Windows)
#   - strip absolute prefix up to project root
NORMALIZED=$(echo "$OUTPUT" | sed 's/\\/\//g' | sed "s|.*/${PROJECT_NAME}/||g")

echo "$NORMALIZED"

ERROR_COUNT=$(echo "$NORMALIZED" | grep -oE 'svelte-check found [0-9]+ errors?' | grep -oE '[0-9]+' | tail -1)

if [ -z "$ERROR_COUNT" ]; then
  echo "" >&2
  echo "Error: Could not parse error count from svelte-check output." >&2
  exit 1
fi

echo "=========================================="
echo "Errors: $ERROR_COUNT | Baseline: $BASELINE"

if [ "$ERROR_COUNT" -gt "$BASELINE" ]; then
  DELTA=$((ERROR_COUNT - BASELINE))
  echo "FAIL: $DELTA new error(s) introduced above baseline!"
  echo ""
  if [ -f "$SNAPSHOT_FILE" ]; then
    echo "--- $SNAPSHOT_FILE (known)"
    echo "+++ current output"
    diff "$SNAPSHOT_FILE" <(echo "$NORMALIZED") || true
  else
    echo "No snapshot found. Run 'pnpm check-snapshot' to create one."
  fi
  echo ""
  echo "To accept the current errors as the new baseline, run:"
  echo "  pnpm check-snapshot"
  [ -n "$GITHUB_ACTIONS" ] && echo "::error::$DELTA new svelte-check error(s) (${ERROR_COUNT} > ${BASELINE} baseline)"
  exit 1
elif [ "$ERROR_COUNT" -lt "$BASELINE" ]; then
  echo "PASS: Error count improved ($ERROR_COUNT < $BASELINE)."
  echo "Run 'pnpm check-snapshot' to tighten the baseline."
  exit 0
else
  echo "PASS: Error count at baseline ($ERROR_COUNT)."
  exit 0
fi
