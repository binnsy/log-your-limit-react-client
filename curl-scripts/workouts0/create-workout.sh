#!/bin/bash

curl "http://localhost:4741/workouts" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "workout": {
      "date": "'"${DATE}"'",
      "title": "'"${TITLE}"'",
      "description": "'"${DESC}"'",
      "start": "'"${start}"'",
      "end": "'"${end}"'",
      "date": "'"${DATE}"'",
      "time": "'"${TIME}"'",
      "distance": "'"${DIST}"'"
    }
  }'

echo
