export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "About WeatherTop V2",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};