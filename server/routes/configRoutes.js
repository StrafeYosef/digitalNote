const UsersRoute = require("../routes/userRoute");
const missionsRoute = require("./missionsRoute");

exports.routesInit = (app) => {
  app.use("/users", UsersRoute);
  app.use("/missions", missionsRoute);
  app.use((req, res) => {
    res.status(404).json({ msg: "Not Found" });
  });
};
