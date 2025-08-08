import express from "express";
import path from "node:path";
import baseRouter from "./routers/baseRouter.js";
import categoryRouter from "./routers/categoryRouter.js";

const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", baseRouter);
app.use("/categories", categoryRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Express app started at http://localhost:${PORT}`);
});
