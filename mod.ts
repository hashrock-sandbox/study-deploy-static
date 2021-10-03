import { join } from "https://deno.land/std@0.78.0/path/mod.ts";
import { lookup } from "https://deno.land/x/media_types/mod.ts";

const files = ["index.html", "style.css", "index.js"];
const BASE_PATH = "/";
const PUBLIC_PATH = "./public";

async function createResponse(fileName: string) {
  const file = await Deno.readFile(fileName);
  const contentType = lookup(fileName) || "text/plain";
  const response = new Response(file);
  response.headers.set("content-type", contentType);
  return response;
}

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);
  for(const file of files) {
    if(pathname.startsWith(BASE_PATH + file)) {
      return await createResponse(join(PUBLIC_PATH, file));
    }
  }
  return createResponse(join(PUBLIC_PATH, files[0]));
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
