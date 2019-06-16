curl http://localhost:4741/workouts/${ID} \
  --request PATCH \
  --include \
  --header 'Content-Type: application/json' \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "workout": {
      "date": "'"${DATE}"'",
      "title": "'"${TITLE}"'",
      "description": "'"${DESC}"'",
      "start": "'"${START}"'",
      "end": "'"${END}"'",
      "date": "'"${DATE}"'",
      "time": "'"${TIME}"'",
      "distance": "'"${DIST}"'"
    }
  }'

#Fields will overwrite on an update if left blank in one of the fields
