# Url Shortener

## About the Project

This project is a URL shortener that allows you to post a URL like `youtube.com` and receive a shortened version that redirects you through HTTP status 302 using the `location` response header.

## How to Run

At the root folder, use the following command: `npm run start`.

## Example

POST url -> `curl -X POST http://localhost:3000/v1/shorten -d '{"url": "https://youtube.com"}'` <br>
EXAMPLE POST RESPONSE -> `{"short_url":"localhost:3000/1hjsqqqdh","status":"success"}` <br>
ACCESS `localhost:3000/1hjsqqqdh` -> GOES TO `https://youtube.com`
