import mongoose from "mongoose";
import app from "./app";
import 'dotenv/config'
const PORT = 5000;


async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.aif7qmj.mongodb.net/book-management?retryWrites=true&w=majority&appName=Cluster0`)
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.log("Error connecting to MongoDB", error)
            })

        app.listen(PORT, () => {
            console.log(`This port is running on the port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()