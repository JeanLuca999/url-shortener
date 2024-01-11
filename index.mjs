import http from "http";
import { redirectUrl } from "./redirectUrl.mjs";
import { urlTable } from "./urlTable.mjs";

const PORT = 3000;

const server = http.createServer((request, response) => {
  if (
    request.url === "/v1/shorten" &&
    request.method.toLowerCase() === "post"
  ) {
    let jsonString = "";
    request.on("data", (data) => (jsonString += data));
    request.on("end", () => {
      const { url } = JSON.parse(jsonString);
      const timeStamp = new Date().getTime();
      const key = timeStamp.toString(32);
      const hostname = request.headers.host;
      urlTable.set(key, url);

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          short_url: `${hostname}/${key}`,
          status: "success",
        })
      );
    });

    return;
  }
  if (request.url.startsWith("/")) {
    const urlPath = request.url.slice(1);
    const key = urlTable.get(urlPath);
    if (!key) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ error: "url not found" }));
      return;
    }
    response.writeHead(302, { location: redirectUrl(key) });
    response.end();
    return;
  }
});

server.listen(PORT, () => console.log(`server running at port ${PORT}`));
