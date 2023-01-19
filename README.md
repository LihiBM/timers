## Prerequisites
* Install [Docker](https://docs.docker.com/get-docker/)
* Install [Docker Compose](https://docs.docker.com/compose/install/)

## Running with docker
Run the following in the project root:
```bash
docker-compose build
```
```bash
docker-compose up
```

## Endpoints:
* POST/timers<br>Example request:
```
http://localhost:3000/timers
```
Example payload:
```
{
    "hours": 0,
    "minutes": 0,
    "seconds": 20,
    "url": "http://www.google.com"
}
```
* GET/timers/{id}<br>Example request
```
http://localhost:3000/timers/63c82c2018153dd660bbd77c
```
here the resource ID is the timer ID previously set.

* GET/timers<br>Returns all timers, active and inactive.

## Important pointers
* Times are saved in UTC standard

## Options for additional dev:
- Adding a testing suite
- Adding pagination for `GET/timers`
- Making the logger save logs remotely
