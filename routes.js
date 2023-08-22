import express from "express";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { readingController } from "./controllers/reading-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

router.get("/dashboard", dashboardController.index);
router.get("/about", aboutController.index);

router.get("/profile", accountsController.profile);
router.post("/profile/updateprofile/:_id", accountsController.profileUpdate);

router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);

router.get("/station/:id", stationController.index);
router.post("/station/:id/addReading", stationController.addReading);
router.get("/station/:stationid/deletereading/:readingid", stationController.deleteReading);
router.get("/station/:stationid/editreading/:readingid", readingController.index);
router.post("/station/:stationid/updatereading/:readingid", readingController.update);
