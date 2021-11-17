import { LoginRoute } from "./LoginRoute";
import { RegisterRoute } from "./RegisterRoute";
import { UpdateUserInfo } from "./update/UpdateUserInfo";
import { NewTableRoute } from "./create/NewTableRoute";
import { GetUserInfo } from "./get/GetUserInfo";
import { NewEmployeeRoute } from "./create/NewEmployeeRoute";
import { GetAllTables } from "./get/GetAllTables";
import { DeleteTable } from "./delete/DeleteTableRoute";
import { GetAllEmployees } from "./get/GetAllEmployees";
import { UpdateEmployee } from "./update/UpdateEmployee";
import { DeleteEmployees } from "./delete/DeleteEmployees";
import { UpdateTableName } from "./update/UpdateTableName";

const routers = [
  LoginRoute,
  RegisterRoute,
  UpdateUserInfo,
  NewTableRoute,
  GetUserInfo,
  GetAllTables,
  NewEmployeeRoute,
  DeleteTable,
  GetAllEmployees,
  UpdateEmployee,
  DeleteEmployees,
  UpdateTableName,
];

const routes = (app) => {
  routers.forEach((route) => {
    app[route.method](route.path, route.handler);
  });
};

export default routes;
