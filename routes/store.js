const app = require("../core/app");
const { view } = require("../core/view");

const router = require("express").Router();

router.use((req, res, next) => {
  next();
});

router.get("/", (p_req, p_res) => {
  view(p_res, "store", "Store", "default", { counter: 0 });
});

router.get("/store1", (p_req, p_res) => {
  view(p_res, "aboute", "aboute", "default", { counter: 0 });
});

/// Using the router;
app.use("/store", router);
