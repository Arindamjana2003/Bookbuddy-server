import { z } from "zod"

class CategoriesValidation {

    create = z.object({
        body: z.object({
          name: z.string().trim().min(3 , "Title is required"),
          description: z.string().trim().optional(),
        }).strict(),
      })
      update = z.object({
       body: z.object({
        name: z.string().trim().min(3 , "Title is required"),
          description: z.string().trim().optional(),
        }).strict(),
        params: z.object({
          categoriesId:z.string().trim()
        })
      })
      delete = z.object({
        params : z.object({
          categoriesId : z.string().trim()
        })
      })
      fetch = z.object({
        params : z.object({
          categoriesId : z.string().trim()
        })
      })
       }
      



export default new CategoriesValidation()


// import { z } from "zod"

// class CategoriesValidation {

//     create = z.object({
//         body: z.object({
//           name: z.string().trim().min(3 , "Title is required"),
//           description: z.string().trim().optional(),
//         }).strict(),
//       })
//       update = z.object({
//        body: z.object({
//         name: z.string().trim().min(3 , "Title is required"),
//           description: z.string().trim().optional(),
//         }).strict(),
//         params: z.object({
//           categoriesId:z.string().trim()
//         })
//       })
//       delete = z.object({
//         params : z.object({
//           categoriesId : z.string().trim()
//         })
//       })
//       fetch = z.object({
//         params : z.object({
//           categoriesId : z.string().trim()
//         })
//       })
//        }
      

// export default new CategoriesValidation()