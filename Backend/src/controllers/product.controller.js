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
                }
    
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

export 