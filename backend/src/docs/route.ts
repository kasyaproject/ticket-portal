import { Express } from "express";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import fs from "fs";
import path from "path";

export default function docs(app: Express) {
  // Serve static files
  app.use(
    "/swagger-ui-dist",
    express.static(path.join(__dirname, "../public/swagger-ui-dist"))
  );

  const css = fs.readFileSync(
    path.resolve(
      __dirname,
      "../../node_modules/swagger-ui-dist/swagger-ui.css"
    ),
    "utf-8"
  );

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput, {
      customCss: css,
    })
  );
}
