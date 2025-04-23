import { string } from "zod";
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
      
    async updateCategories(body, params){
        const { CategoriesId } = params
        const data = await Categories.update({
              name : body.name,
              description : body.description,
              params : CategoriesId,


        })
        return data;
    }
    async deleteCategories(params){
        const { CategoriesId } = params
        const data = await Categories.delete({
            where : { id:CategoriesId}
    });
     return data; 
    }
    async fetchAllCategories(){
        const data = await categoriesController.findAll();
        return data;
    }
}
export default new CategoriesServices();
