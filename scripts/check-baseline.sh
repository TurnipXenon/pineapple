#!/bin/bash
# check-baseline.sh: Run svelte-check and fail if errors exceed the stored baseline.
#
# To update the baseline intentionally (accepting known errors):
#   echo <new_count> > .svelte-check-baseline
#
# If errors improve below baseline, the script suggests tightening it.

set -e

BASELINE_FILE=".svelte-check-baseline"

if [ ! -f "$BASELINE_FILE" ]; then
  echo "Error: $BASELINE_FILE not found." >&2
  echo "Create it with: echo <error_count> > $BASELINE_FILE" >&2
  exit 1
fi

BASELINE=$(cat "$BASELINE_FILE" | tr -d '[:space:]')
echo "Baseline: $BASELINE errors"

# svelte-kit sync is required before svelte-check
pnpm exec svelte-kit sync

# Run svelte-check with machine output for reliable parsing (no ANSI codes)
OUTPUT=$(pnpm exec svelte-check --tsconfig ./tsconfig.json --output machine 2>&1 || true)
echo "$OUTPUT"

# Extract error count from the completed summary JSON line
ERROR_COUNT=$(echo "$OUTPUT" | grep -oE '"errorCount":[0-9]+' | grep -oE '[0-9]+' | tail -1)

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
  echo "Fix them, or accept them by updating the baseline:"
  echo "  echo $ERROR_COUNT > $BASELINE_FILE"
  [ -n "$GITHUB_ACTIONS" ] && echo "::error::$DELTA new svelte-check error(s) (${ERROR_COUNT} > ${BASELINE} baseline)"
  exit 1
elif [ "$ERROR_COUNT" -lt "$BASELINE" ]; then
  echo "PASS: Error count improved ($ERROR_COUNT < $BASELINE)."
  echo "Tighten the baseline to lock in the improvement:"
  echo "  echo $ERROR_COUNT > $BASELINE_FILE"
  exit 0
else
  echo "PASS: Error count at baseline ($ERROR_COUNT)."
  exit 0
fi
