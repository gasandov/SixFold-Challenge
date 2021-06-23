#!/bin/bash

echo "start API testing"

echo "Route from GKA to MYA"
one=$(curl -X GET "http://localhost:3000/journeys?from=GKA&to=MYA")

echo "$one"

echo "Route from NSI to NDJ"
two=$(curl -X GET "http://localhost:3000/journeys?from=NSI&to=NDJ")

echo "$two"

echo "Route from MYA to SID"
three=$(curl -X GET "http://localhost:3000/journeys?from=MYA&to=SID")

echo "$three"

echo "Route from MAG to WWK"
four=$(curl -X GET "http://localhost:3000/journeys?from=MAG&to=WWK")

echo "$four"

echo "end of testing"

