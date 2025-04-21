import { Categories } from "../model/categories.model.js";


class CategoriesServices {
    async createCategories(body , user ) {
        const { id } = user 
        const data = await Categories.create({
            name : body.name , 
            description : body.description , 
            user : id ,
        }) 
        return data ;
    } 
}

export default new CategoriesServices();