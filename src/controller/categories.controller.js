import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import categoriesService from "../services/categories.service.js";
import { sendResponse } from "../utils/response.handler.js";

class CategoriesController {
    

    async createCatrgories(req , res){
        try {
            const data = await categoriesService.createCategories(req.body , req.user ) 
            console.info("categories created")
            return sendResponse(res , { status:HTTP_STATUS.CREATED , message : RESPONSE_MESSAGES.CETAGORIES_CREATE_SUCCESS , success:true , data:data })
        } catch (error) {
            return sendResponse(res , { status:HTTP_STATUS.INTERNAL_SERVER_ERROR , success:false , message:RESPONSE_MESSAGES.INTERNAL_ERROR , error : error  })
        }

    }

    async updateCategories(req,res){
        try{
            const categoriesEsxit = await categoriesService.updateCategories(req.params.categoriesId);
            if(!categoriesEsxit){
            return sendResponse(res,{status:HTTP_STATUS.BAD_REQUEST,message:RESPONSE_MESSAGES.CETAGORIES_NOT_EXIST,success:false,})
            }
            const categories = await categoriesService.updateCategories(req.body, req.params.categoriesId);

            return sendResponse(res, {status: HTTP_STATUS.OK,message: RESPONSE_MESSAGES.CATEGORIES_UPDATED,success: true, data: categories ,
            });



        }catch(error){
            return sendResponse(res, {status: HTTP_STATUS.INTERNAL_SERVER_ERROR,message: RESPONSE_MESSAGES.INTERNAL_ERROR,  success: false,error: error
            });
        }
    }

        async deleteCategories(req,res){
            try{
                const { categoriesId } = req.params;
                const categories = await categories.findById(categoriesId);
    
                if(!categories){
                    return sendResponse(res , { status : HTTP_STATUS.BAD_REQUEST,message: RESPONSE_MESSAGES.CATEGORIES_NOT_FOUND, sucess : false, 
                        })
                }
    
                await categories.findByIdAndDelete(categoriesId);
                return sendResponse(res, { status : HTTP_STATUS.OK,message : RESPONSE_MESSAGES.CATEGORIES_DELETE,sucess : true,data : categories
    
                });
    
    
            }catch(error){
                console.error("error =>", error);
                return sendResponse(res,{status: HTTP_STATUS.NOT_FOUND ,message : RESPONSE_MESSAGES.CATEGORIES_NOT_FOUND,sucess : false,
                });

            }
        }
        async fetchAllCategoriesList( res) {
            try{
                const categories = await categories.find();
                return sendResponse(res , {status : HTTP_STATUS.OK, sucress : true ,message : categories.length ? RESPONSE_MESSAGES.FETCH_ALL_CATEGORIES : RESPONSE_MESSAGES.NO_CATEGORIES, data : categories
                })
    
            }catch(error){
                console.error("Error => ",error);
                return sendResponse( res , {status : HTTP_STATUS.INTERNAL_SERVER_ERROR ,message : RESPONSE_MESSAGES.INTERNAL_ERROR, sucess: false
                     });
            }
        }
    }
    
    
    
    
    




export default new CategoriesController();
