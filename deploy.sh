#!/bin/bash

zip -r payload * #> /dev/null 2>&1 
aws lambda update-function-code --function-name Smash-Randomizer --zip-file fileb://payload.zip #> /dev/null 2>&1
echo done $(date)
rm payload.zip
