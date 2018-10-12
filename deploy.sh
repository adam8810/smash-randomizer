#!/bin/bash

rm -f payload.zip
zip -r payload * #-x '*.lock' -x '*.log' -x '*.swp' -x '*.json' -x 'tests*'
aws lambda update-function-code --function-name Smash-Randomizer --zip-file fileb://payload.zip #> /dev/null 2>&1
echo done $(date)
