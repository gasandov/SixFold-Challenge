# SixFold-Challenge

## Used resources

- [DATASET](https://data.world/tylerudite/airports-airlines-and-routes)

## How to run project

1. execute `yarn install`
2. execute `yarn run build`
3. execute `yarn run start`

## How to run project and watch for changes

1. execute `yarn install`
2. execute `yarn run build:watch`
3. on a different terminal execute `yarn run start:watch`

## How to try out the API

- Option 1: Use postman or any other similar tool to execute get requests to `/journeys` with query params `from` and `to`
- Option 2: Execute `try-out-api.sh` to run some `curl` commands

## I/O examples

**input:** `http://localhost:3000/journeys?from=GKA&to=MYA`

**_outpot_:**

```JSON
{
    "success": true,
    "data": {
        "route": "GKA -> POM -> SYD -> MYA",
        "distance": 3419.38,
        "message": "Shortest route was found"
    }
}
```

**input:** `http://localhost:3000/journeys`

**output:**

```JSON
{
    "success": false,
    "message": "Please provide an origin and destination"
}
```

**input:** `http://localhost:3000/journeys?from=ABC&to=GHA`

**output:**

```JSON
{
    "success": true,
    "data": {
        "route": "",
        "distance": 0,
        "message": "Route was not found for provided inputs"
    }
}
```
