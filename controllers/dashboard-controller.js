export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "WeatherTop Version 2",
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
};