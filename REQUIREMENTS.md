# Instructions
## Twitter API display

The goal of this project is for the candidate to demonstrate skills in external API integration and backend frontend connection while using Typescript. Demonstrating good design skills is a plus.

Making request to Twitter requires setting up a free developer app which gives credentials to use in every request. Those credentials need to be secured and not accessible to the user.

The user must be able to make different request using the frontend interface though: Here, focusing on user timelines, the user must be able to choose from different users and see up to date Tweets from this user.

# Goals

#### The candidate will have to perform the following tasks:

- [] Use Typescript for backend and frontend (the building processes can be separated though)
- [] Provide a NodeJS backend endpoint that takes a user_id and returns a list of recent formatted tweets of that user
- [] The solution to connect to Twitter is up to the candidate: tokens are provided below.
- [] The user timeline endpoint is documented here
- [] Provide a one-page frontend where the user can get at least three different user timelines
- [] Also a refresh button to get up to date tweets for the same user
- [] Tweets need to be presented in some ways that is not using Twitter provided cards if possible
- [] Documentation of the choices made, the technologies used, and the steps to run the project


## Optional goals


#### Extra points will be rewarded for the following:

- [X] Using a backend framework such as Express
- [X] Using a frontend framework such as React
- []  Testing endpoints
- [] Attention to code quality
- Extra features such as:
    - [] Twitter user handle autocompletion in frontend
    - [] History of last requests (in database or using the browser local storage)



## Credentials

API key: process.env.TWITTER_CONSUMER_KEY

API secret key: process.env.TWITTER_CONSUMER_SECRET

Access token: process.env.TWITTER_ACCESS_TOKEN_KEY

Access token secret: process.env.TWITTER_ACCESS_TOKEN_SECRET