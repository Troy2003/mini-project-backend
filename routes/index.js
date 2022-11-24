import express from "express";

import {
  registerController,
  loginController,
  userController,
  userHandleController,
  forgotController,
  courseController,
  degreeController,
  notificationController,
  postController,
  resultController,
  sectionController,
  subjectController
} from "../controllers";


import { admin, authHeader, teacher } from '../middlewares'

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.post("/me", authHeader, userController.me);
router.put("/me", authHeader, userController.update);

router.get('/student', userHandleController.student)
router.get('/teacher', userHandleController.teacher)


router.post("/forgot", forgotController.sendLink);
router.get("/reset/:id/:token", forgotController.verifyLink);
router.post("/reset/:id/:token", forgotController.reset);



router.post("/degree", [authHeader, admin], degreeController.create);
router.get("/degree", degreeController.index);
router.put("/degree/:id", [authHeader, admin], degreeController.update);
router.delete("/degree/:id", [authHeader, admin], degreeController.delete);

router.post("/course", [authHeader, admin], courseController.create);
router.get("/course", courseController.index);
router.put("/course/:id", [authHeader, admin], courseController.update);
router.delete("/course/:id", [authHeader, admin], courseController.delete);

router.post("/subject", [authHeader, admin], subjectController.create);
router.get("/subject", subjectController.index);
router.put("/subject/:id", [authHeader, admin], subjectController.update);
router.delete("/subject/:id", [authHeader, admin], subjectController.delete);

router.post("/section", [authHeader, admin], sectionController.create);
router.get("/section", sectionController.index);
router.put("/section/:id", [authHeader, admin], sectionController.update);
router.delete("/section/:id", [authHeader, admin], sectionController.delete);

router.post("/notification", [authHeader, teacher], notificationController.create);
router.get("/notification", notificationController.index);
router.put("/notification/:id", [authHeader, teacher], notificationController.update);
router.delete("/notification/:id", [authHeader, teacher], notificationController.delete);

router.post("/post", [authHeader, teacher], postController.create);
router.get("/post", postController.index);
router.put("/post/:id", [authHeader, teacher], postController.update);
router.delete("/post/:id", [authHeader, teacher], postController.delete);

router.post("/result", [authHeader, teacher], resultController.create);
router.get("/result", resultController.index);
router.put("/result/:id", [authHeader, teacher], resultController.update);
router.delete("/result/:id", [authHeader, teacher], resultController.delete);

export default router;
