import express, { Express } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import postsRoutes from "./routes/post";
import commentsRoutes from "./routes/comment";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import swaggerUI from "swagger-ui-express"
 import swaggerJsDoc from "swagger-jsdoc"

 app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use("/posts", postsRoutes);
        app.use("/comments", commentsRoutes);
        app.use("/auth", authRoutes);

 const options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Web Dev 2025 REST API",
          version: "1.0.0",
          description: "REST server including authentication using JWT",
      },
      servers: [{url: "http://localhost:" + process.env.PORT},],
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const initApp = async () => {
  return new Promise<Express>((resolve, reject) => {
    const db = mongoose.connection;
    db.on("error", (err) => {
      console.error(err);
    });
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    if (process.env.DB_CONNECT === undefined) {
      console.error("MONGO_URI is not set");
      reject();
    } else {
      mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log("initApp finish");
        resolve(app);
      });
    }
  });
};

export default initApp;