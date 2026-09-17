import prisma from "../lib/prisma.js"
export const productPost = async(req,res) => {
    try{
        const {
            name,
            description,
            image,
            price,
            location,
            year,
            categoryId,
            productDetail
        } = req.body
        const userId = req.user.userId

        const product = await prisma.product.create({
            data:{
                name,
                description,
                image: {
                    create: {
                        url: image
                    }
                },
                productDetail,
                price,
                location,
                year,
                categoryId,
                userId,
            }
        })
        return res.status(201).json({
            message: "Product created successfully",
            product
        });

    }catch(err){
        console.error(err)
        return res.status(500).json({
            message: "Failed to create product"
        });
    }
}

export const fetchAllProducts = async(req,res)=>{
    try{
        const page = Math.max(Number(req.query.page)||1 , 1)
        const limit = Math.min(Math.max(Number(req.query.limit)|| 10 , 1),50)
        const skip = (page-1)*limit


        const [products,totalProducts] = await Promise.all([
            prisma.product.findMany({
                skip,
                take:limit,
                orderBy: {
                    createdAt: "desc"
                },
    
        }),
            prisma.product.count()
        ])

        const totalPages = Math.ceil(totalProducts/limit)
        if(products.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Items found with your match"
            })
        }
        return res.status(200).json({
            success:true,
            message: "Items found successfully",
            data:{
                products,
                pagination:{
                    page,
                    limit,
                    totalPages,
                    totalProducts,
                    hasNextPage: page< totalPages,
                    hasPreviousPage: page>1
                }
            }

        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch products Internal server error: "
        })
    }
}

export const fetchProductsByFilter = async(req,res) => {
    try{
        const page = Math.max(Number(req.query.page)||1 , 1)
        const limit = Math.min(Math.max(Number(req.query.limit)|| 10 , 1),50)
        const skip = (page-1)*limit


        const categoryId = Number(req.params.categoryId)
        const minPrice = Number(req.query.min_price_) || undefined
        const maxPrice = Number(req.query.max_price_) || undefined
        const afterYear = Number(req.query.after_year)|| undefined

        const where = {
            categoryId,
            price:{
                gte: minPrice,
                lte: maxPrice
            },
            year:{
                gte: afterYear
            },
        }

        const [products, totalProducts] = await Promise.all([
            prisma.product.findMany({
                skip,
                take:limit,
                orderBy: {
                    createdAt: "desc"
                },
                where
        }),
        prisma.product.count({
        where
        })
            
        ])
        if(products.length ===0 ){
            return res.status(200).json({
                success:true,
                message:"Product not found in this category"
            })
        }
        const totalPages = Math.ceil(totalProducts/limit)
        return res.status(200).json({
            success:true,
            message:"Products found successfully in this category",
            data: products,
            pagination: {
                page,
                limit,
                totalProducts,
                totalPages,
                hasNextPage: page<totalPages,
                hasPreviousPage: page>1
            }

        })
    }catch(err){
        console.log("Failed to fetch products by category Internal Error: ",err)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch products by category"
        })
    }
}