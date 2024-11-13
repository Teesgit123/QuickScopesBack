// import express, { Express, Request, Response } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import userRoutes from "./routes/userRoutes";

// dotenv.config();

// const { CORS_ORIGIN, PORT } = process.env;
// // const port = process.env.PORT || 3000;
// const allowedOrigins = CORS_ORIGIN ? CORS_ORIGIN.split(",") : [];
// const port = PORT || 3000;

// export const app: Express = express();

// app.use(express.json());
// app.use(cors({ origin: CORS_ORIGIN }));

// app.get("/", (request: Request, response: Response) => {
//   response.send("CORS settings have been configured!");
// });

// app.use("/users", userRoutes);

// app.listen(port, () => {
//   console.log(
//     `CORS allowed origins: ${allowedOrigins.join(", ") || "None specified"}`
//   );
//   console.log(`Running on port: ${port}`);
// });

import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const { CORS_ORIGIN, PORT } = process.env;
const port = PORT || 3000;

// Start the server only if the file is run directly
if (require.main === module) {
  app.listen(port, () => {
    const allowedOrigins = CORS_ORIGIN ? CORS_ORIGIN.split(",") : [];
    console.log(
      `CORS allowed origins: ${allowedOrigins.join(", ") || "None specified"}`
    );
    console.log(`Running on port: ${port}`);
  });
}
