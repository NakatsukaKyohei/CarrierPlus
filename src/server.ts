import * as http from "http";

export function listen(): void {
  const port = 8080;
  const server = http.createServer(
    (req, res) => {
      res.end();
    }
  );
  server.listen(port);
} 
