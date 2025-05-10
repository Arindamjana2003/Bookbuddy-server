import { Categories } from "../model/categories.model.js";

class CategoriesServices {
    // Create a new category
    async createCategories(body, user) {
        const { id } = user;
        const data = await Categories.create({
            name: body.name,
            description: body.description,
            user: id,
        });
        return data;
    }

    //  Update category by ID
    async updateCategories(body, params) {
        const { CategoriesId } = params;
        const data = await Categories.findByIdAndUpdate(
            CategoriesId,
            {
                name: body.name,
                description: body.description,
            },
            { new: true } // Returns updated document
        );
        if (!data) {
            throw new Error("Category not found");
        }

        return data;
    }

    //  Delete category by ID
    async deleteCategories(params) {
        const { CategoriesId } = params;
        const data = await Categories.findByIdAndDelete(CategoriesId);
        if (!data) {
            throw new Error("Category not found");
        }
        return data;
    }

    //  Fetch all categories
    async fetchAllCategories() {
        const data = await Categories.find();
        // if (!data.length) {
        //     throw new Error("Categories not found");
        // }
        return data;
    }

    //  Optional: Fetch single category by ID
    async fetchSingleCategory(params) {
        const { CategoriesId } = params;
        const data = await Categories.findById(CategoriesId);
        if (!data) {
            throw new Error("Category not found");
        }
        return data;
    }
}

export default new CategoriesServices();
