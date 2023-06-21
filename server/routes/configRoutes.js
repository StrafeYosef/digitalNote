const DetailsRoute = require("../routes/detailsRoutes");
const UsersRoute = require("../routes/userRoute");

exports.routesInit = (app) => {
  app.use("/users", UsersRoute);
  app.use("/details", DetailsRoute);
  app.use((req, res) => {
    res.status(404).json({ msg: "Not Found" });
  });
};
