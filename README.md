Guide

1. docker-compose up

2. npm start

Legend:

Application has 3 endpoints:

1. /api/fetch-last-events ; Method: GET

This endpoint not receiving any parameters. Declared for fetching last 10000 blocks' events and write them to database.

2. /api/subscribe ; Method: GET

This endpoint will activate application subscribing to transfer events in realtime. 

3. /api/transfers ; Method: POST

Body example (JSON Raw):

{
    "days": 3,
}

This endpoint will return transfer volume between range ( (NOW - days), (NOW)).