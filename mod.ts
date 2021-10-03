import {
  fromFileUrl,
  dirname,
  join,
} from "https://deno.land/std@0.78.0/path/mod.ts";

const files = ["index.html", "style.css"];
const BASEPATH = "/"

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);
  console.log(pathname, join("", files[1]));
  if (pathname.startsWith(BASEPATH + files[1])) {
    const file = await Deno.readFile(join("./public", files[1]));
    return new Response(file, {
      headers: {
        "content-type": "text/css",
      },
    });
  }

  return new Response(await Deno.readFile(join("./public", files[0])), {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
