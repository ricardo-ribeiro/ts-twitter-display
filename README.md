
# Twitt 

A application to show twitter timelines with user search and autocompletition


![](./public/app-preview0.png)

UI Without Timelines Added yet

![](./public/app-preview1.png)

Auto Completion for a twitter screen name

![](./public/app-preview2.png)

Added Timeline to Timelines

![](./public/app-preview4.png)

Added another Timeline to Timelines

Timelines with Image and Video Tweets

![](./public/app-preview6.png)

Timelines with Link Meta Data Preview






<br/>

# Requirements

This project requirements [Requirements](./REQUIREMENTS.md).


# Services

Dockered Redis: Used For Caching Requests, Atomic, Multi Instance Support

# Backend


- twitter -> Twitter Nodejs Client
- express -> Http Server Framework
- jest -> Testing Framework
- supertest -> Http Endpoint Testing
- redis -> Redis Client For Caching
- dotenv -> .env File Loader


## Endpoints

### Timeline for User Id
```GET /api/tweets/:user_id```

30s Redis Cache

We are caching the timeline for a given user_id for 30s, Within 30s only the first request hits twitter.

```bash
curl 'http://localhost:3000/api/tweets/911154056302940160' --compressed
```

---

### Search For a User By Screen Name 
```GET /api/twitter/user/:screen_name```

30m Redis Cache

We are caching the search results for a given search query for 30m, Within 30m only the first request hits twitter.

```bash
curl 'http://localhost:3000/api/twitter/user/elonmusk' --compressed
```

---

### Get Url Link Metadata (OpenGraph, Twitter Cards)

```GET /api/link/meta?link=_link```

30m Redis Cache

We are caching the metadata results for a given url for 30m, Within 30m only the first request hits the url.

```bash
curl 'http://localhost:3000/api/link/meta?link=https://google.com' --compressed
```
### Tests Results

![](./public/backend-test-results.png)

<br/>
<br/>
<br/>

# Frontend

This project was bootstrapped with [Create React App](./CRA-README.md).

- react -> Functional UI Framework
- lodash  -> Javascript Utilities Library - Used For Debouncing AutoComplete User Search Requests
- timeago.js -> Tiny 2kb Lib to format Time to Time ago
- react-bulma-components -> Bulma UI Framework React Components
- jest -> Default CRA Test Library
- react-app-polyfill -> Adding IE9 and IE11 Polyfills (since we use fetch)





# Run Application in Dev Mode

## Requirements:

- Nodejs 10+
- Docker
- docker-compose

1 - Install Dependencies
```bash
npm install
```

2 - Start the Redis Docker Container
```bash
docker-compose up redis &
```

1 - Create and .env file at root of project with the following structure 
```bash
TWITTER_CONSUMER_KEY=____YOUR_TWITTER_CONSUMER_KEY_____
TWITTER_CONSUMER_SECRET=____YOUR_TWITTER_CONSUMER_SECRET_____
TWITTER_ACCESS_TOKEN_KEY=____YOUR_TWITTER_ACCESS_TOKEN_KEY______
TWITTER_ACCESS_TOKEN_SECRET=___YOUR_TWITTER_ACCESS_TOKEN_SECRET____
```

2 - Run The Backend Server
```bash
npm run dev:server
```

3 - Run The Ui Frontend Dev Server
```bash
npm start
```

[UI URL](http://localhost:3000)

```
NOTE: Requests in development mode are proxyed trough the react dev server to the backend server.
```



# Run Application in "Prod" Mode

## Requirements:

- Nodejs 10+
- Docker
- docker-compose

1 - Install Dependencies
```bash
npm install
```

2 - Start the Redis Docker Container
```bash
docker-compose up redis &
```

1 - Create and .env file at root of project with the following structure 
```bash
TWITTER_CONSUMER_KEY=____YOUR_TWITTER_CONSUMER_KEY_____
TWITTER_CONSUMER_SECRET=____YOUR_TWITTER_CONSUMER_SECRET_____
TWITTER_ACCESS_TOKEN_KEY=____YOUR_TWITTER_ACCESS_TOKEN_KEY______
TWITTER_ACCESS_TOKEN_SECRET=___YOUR_TWITTER_ACCESS_TOKEN_SECRET____
```

2 - Run The Backend Server
```bash
npm run start:prod
```

[UI URL](http://localhost:9990)





# Run Application in Prod Docker Container Mode



1 - Create and .env file at root of project with the following structure 
```bash
TWITTER_CONSUMER_KEY=____YOUR_TWITTER_CONSUMER_KEY_____
TWITTER_CONSUMER_SECRET=____YOUR_TWITTER_CONSUMER_SECRET_____
TWITTER_ACCESS_TOKEN_KEY=____YOUR_TWITTER_ACCESS_TOKEN_KEY______
TWITTER_ACCESS_TOKEN_SECRET=___YOUR_TWITTER_ACCESS_TOKEN_SECRET____
```

2 - Start the Redis Docker Container And Twitt Application
```bash
docker-compose up  &
```

[UI URL](http://localhost:8080)