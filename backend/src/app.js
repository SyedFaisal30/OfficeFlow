import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import departmentRouter from './routes/department.routes.js';
import employeeRouter from './routes/employee.routes.js';
import adminRouter from './routes/admin.routes.js';

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser());

app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/admin", adminRouter);

export { app };