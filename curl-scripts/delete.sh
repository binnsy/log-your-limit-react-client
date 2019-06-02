#!/bin/bash

curl "https://sei-movie-api.herokuapp.com/calendar/${ID}" \
  --include \
  --request DELETE \

echo
