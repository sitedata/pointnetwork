#!/bin/sh

# NOTE: You need to start up Point Network before running this!
# Run this script from within the project root folder like so:
# ./scripts/deploy-sites.sh

EXAMPLE_SITES="./example/*"
DATADIR=${1:-~/.point/test2}

for SITE in $EXAMPLE_SITES;
do
  echo
  echo "DEPLOYING: ${SITE}"
  echo

  [ -d $SITE/contracts ]
  ./point deploy $SITE --datadir $DATADIR -v

  echo
  echo "FINISHED: ${SITE}"
  echo
done