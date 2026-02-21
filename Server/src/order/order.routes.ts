import { Router } from "express";
import {
getOrderDetailsHandler,
  getOrdersHandler, 
  getuserOrdersHandler,
  updateOrderStatusHandler,
} from "./order.controller";
import { authenticate }  from "../common/middleware/auth.middleware";
import { allowRoles  } from "../common/middleware/role.middleware";

const orderRouter = Router();

 
orderRouter.get("/", authenticate,allowRoles("ADMIN", "MANAGER"), getOrdersHandler);
orderRouter.patch("/:id",authenticate,allowRoles("ADMIN", "MANAGER"),updateOrderStatusHandler);
orderRouter.get("/:id", authenticate,allowRoles("ADMIN", "MANAGER"), getOrderDetailsHandler);
orderRouter.get("/user/:id",authenticate,allowRoles("ADMIN" , "MANGER"),getuserOrdersHandler)
export default orderRouter;


 
