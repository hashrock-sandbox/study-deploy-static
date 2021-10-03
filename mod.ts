async function handleRequest(request: Request) {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith("/style.css")) {
      const file = await Deno.readFile("./style.css");
      return new Response(file, {
        headers: {
          "content-type": "text/css",
        },
      });
    }
  
    return new Response(
      `<html>
        <head>
          <link rel="stylesheet" href="style.css" />
        </head>
        <body>
          <h1>Example</h1>
        </body>
      </html>`,
      {
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      },
    );
  }
  
  addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(handleRequest(event.request));
  });