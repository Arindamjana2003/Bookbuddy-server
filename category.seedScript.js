import "dotenv/config";

import mongoose from "mongoose";
import { Categories } from "./src/model/categories.model.js"; // Adjust the path as needed

const categories = [
    "Literature",
    "Science",
    "Technology",
    "Mathematics",
    "History",
    "Art & Design",
    "Biographies",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Self Help",
    "Comics & Graphic Novels",
    "Children's Books",
    "Educational",
    "Philosophy",
    "Religion",
    "Travel",
    "Health & Fitness",
    "Cooking",
    "Poetry",
    "Business & Finance",
    "Law",
    "Politics",
    "Environment",
];

async function seedCategories() {
    try {
        await mongoose.connect(process.env.DB_URI);

        // Optionally clear existing categories
        // await Category.deleteMany({});

        const insertData = categories.map((name) => ({ name }));
        const result = await Categories.insertMany(insertData, {
            ordered: false,
        });

        console.log("Categories seeded:", result.length);
        mongoose.disconnect();
    } catch (err) {
        console.error("Error seeding categories:", err.message);
        mongoose.disconnect();
    }
}

seedCategories();
