import dotenv from "dotenv";
import { app } from "./app.js";
import dbConnect from "./utils/dbConnect.js";

dotenv.config({ path:"./.env"});

dbConnect()
.then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((error) => {
     console.error("Database connection failed", error); 
});