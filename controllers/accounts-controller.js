import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("playlist", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },
  
  async profile(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
      const viewData = {
        title: "Edit User Profile",
        user: loggedInUser,
      };
      // console.log(`${JSON.stringify(viewData)}`);
      response.render("profile-view", viewData);
    },

    async profileUpdate(request, response){
      const loggedInUser = await accountsController.getLoggedInUser(request);
        const userId = await userStore.getUserById(loggedInUser._id);
        const newUser = {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          // email: request.body.email,
          password: request.body.password
        };
        // console.log(`${JSON.stringify(userId._id)}`);
        await userStore.updateUser(userId._id, newUser);
        response.redirect("/profile");
      },

//  async profile(request, response) {
//     // const user = getLoggedInUser(request.body);
//     // const email = await userStore.getUserByEmail(request.body.email);
//     const viewData = {
//       title: "User Profile",
//     //   user: user,
//     //  email: email,
//     };
//     response.render("profile-view", viewData);
//   },


  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("playlist", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.playlist;
    return await userStore.getUserByEmail(userEmail);
  },
};