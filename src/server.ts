import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

async function bootstrap() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('Connected to the MongoDB server successfully');

        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
          });
    } catch (err) {
        console.error('Failed to connect to the MongoDB server', err);
     }

};

bootstrap();