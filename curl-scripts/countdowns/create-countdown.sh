#!/bin/bash

curl "http://localhost:4741/countdowns" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "countdown": {
      "date": "'"${DATE}"'",
      "title": "'"${TITLE}"'"
    }
  }'

echo
