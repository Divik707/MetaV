import express from "express";
import router from "./routes/route";

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/v1', router);

app.listen(3000, () => {
    console.log(`Server is running on ${port}`);
})