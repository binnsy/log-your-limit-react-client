curl http://localhost:4741/countdowns/${ID} \
  --request PATCH \
  --include \
  --header 'Content-Type: application/json' \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "countdown": {
      "date": "'"${DATE}"'",
      "title": "'"${TITLE}"'"
    }
  }'

#Fields will overwrite on an update if left blank in one of the fields
