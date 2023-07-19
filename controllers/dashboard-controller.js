export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "WeatherTop V2 Dashboard",
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
};