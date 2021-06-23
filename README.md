# SixFold-Challenge

## Resources

- [DATASET](https://data.world/tylerudite/airports-airlines-and-routes)

## How to run project

1. execute `yarn install`
2. execute `yarn run build`
3. execute `yarn run start`

## How to run project and watch for changes

1. execute `yarn install`
2. execute `yarn run build:watch`
3. on a different terminal execute `yarn run start:watch`

## How to test the API

- Option 1: Use postman or any other similar tool to execute get requests to `/journeys` with query params `from` and `to`
- Option 2: Execute `test-api.sh` to run some `curl` commands
