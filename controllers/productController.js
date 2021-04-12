const db = require('../database/models');

const {Op,Sequelize} = require('sequelize');
const { sequelize } = require('../database/models');

module.exports = {
    getProducts : (req,res) => {
        db.Products.findAll({include:[
            {association:'imagenes'},
            {association: 'categoria'},
        ]})
         .then(result => {
             res.status(200).json({
                 meta : {
                     status : 200,
                 },
                 data : result
             })
         }).catch(error => console.log(error))
    },
    getOneProduct : (req,res) => {
        db.Products.findByPk(req.params.id, {
            include : [
                { association: 'categoria'},
                { association: 'componente'},
                { association: "marca"},
                { association: "imagenes"},
                { association: "garantia"} 
            ]
        })
        .then(result => {
            if(!result){
                res.status(404).json({
                    meta : {
                        status : 404
                    },
                    msg : 'Product not find'
                })
                
            }else {

                res.status(200).json({
                    meta : {
                        status : 200
                    },
                    data : result
                })
                
            }
            
        }).catch(error => res.send(error))
    },
    createProduct : (req,res) => {
        const {image, title, price, insale, garantia, component, mark, category, model, stock, description, features } = req.body;

        db.Products.create({
            name : title,
            price,
            insale,
            guarantee_id : garantia,
            component_id : component,
            mark_id : mark,
            stock : stock,
            description : description,
            features : features,
            model : model,
            category_id : category
        })
        .then(newProduct => {
            db.Images.create({
                name : image,
                product_id: newProduct.id
            })
        })
        .then(result => {
            return res.status(200).json({
                status : 200,
                msg : 'producto creado con exito'

            })
        })
        .catch(error => res.send(error))
    },
    editProduct : (req,res) => {

        const { image, title, price, insale, garantia, component, mark, category, model, stock, description, features } = req.body;


        db.Products.update({
            name: title,
            price: price,
            insale: insale,
            guarantee_id: garantia,
            component_id: component ,
            mark_id: mark ,
            model: model ,
            stock: stock ,
            description: description ,
            features: features ,
            category_id: category ,
            image: image 
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {  
            
            return db.Images.update({
                name : image
            },
            {
                where : {
                    product_id : req.params.id

                }
            })
             
        })
        .then(result => {
            
            
            if(result[0]){
                return res.status(200).json({
                    status : 200,
                    msg : 'Producto editado correctamente'
                })
            }else{
                return res.status(200).json({
                    status : 200,
                    msg : 'Los cambios no puedieron realizarse'
                })
            }
        }).catch(error => console.log(error))
    },
    getsRandomProducts : (req,res) => {
       
        let limite = req.params.limit;
                
        db.Products.findAll({
            include: [
                { association: 'imagenes' },  
                { association: 'categoria' },
            ],
            order: sequelize.random(),
            limit: Number(limite)
        }).then(result => {
            return res.status(200).json({
                meta : {
                    status : 200,
                    limitProducts : limite
                },
                data : result
            })
        }).catch(error => console.log(error))

        
    },
    searchProduct : (req,res) => {
  
        db.Products.findAll({
            where : {
                name : {
                    [Op.like] : `%${req.query.search}%`
                }
            },
            include : [{association : 'imagenes'}]
        })
        .then(result => {
            return res.status(200).json({
                meta : {
                    status : 200,
                    msg : 'Productos encontrados ' + result.length
                },
                data : result
            })
        }).catch(error => console.log(error))
    },
    productList : (req,res) => {
        let limite = req.query.skip
        let category = req.query.categoria
        let filtro = req.query.filtro;
        let letter = req.query.letter

        console.log(letter)

        //return res.send(precio)
        /*PASAR LOS CONDICIONES CON UN SWITCH*/
        
        if(Number(category) && filtro){
            console.log('se esta ejecutando categoria y filtro')
            db.Products.findAll({
                limit : 6,
                offset : Number(limite),
                include:[
                {association:'imagenes'},
                {association: 'categoria'},
            ],
                where : {
                    category_id : Number(category)
                },
                order : [
                    ['price' , filtro]
                ],
                
               
        })
             .then(result => {
                 return res.status(200).json({
                     meta : {
                         status : 200,
                     },
                     data : result
                 })
             }).catch(error => console.log(error))
    

        }else if(letter == "ASC" || letter == "DESC"){
            console.log("hola " + letter)
               
            if (Number(category)) {
                console.log("hola se esta ejecutando categoria mas letter")
            
                console.log(category)

                db.Products.findAll({
                    limit : 6,
                    offset : Number(limite),
                    include:[
                    {association:'imagenes'},
                    {association: 'categoria'},
                ],
                    where : {
                        category_id : Number(category)
                    },
                    order : [
                        ['name' , letter]
                    ],
                    
                   
            })
                 .then(result => {
                     return res.status(200).json({
                         meta : {
                             status : 200,
                         },
                         data : result
                     })
                 }).catch(error => console.log(error))
             
        
    
            }

            db.Products.findAll({
                limit : 6,
                offset : Number(limite),
                include:[
                {association:'imagenes'},
                {association: 'categoria'},
            ],
                order : [
                    ['name' , letter]
                ],
                
                
               
            })
             .then(result => {
                 return res.status(200).json({
                     meta : {
                         status : 200,
                     },
                     data : result
                 })
             }).catch(error => console.log(error))

        }else if(Number(category)){
            console.log('se esta ejecutando categoria')
            db.Products.findAll({
                limit : 6,
                offset : Number(limite),
                include:[
                {association:'imagenes'},
                {association: 'categoria'},
            ],
                where : {
                    category_id : Number(category)
                },          
               
        })
             .then(result => {
                 return res.status(200).json({
                     meta : {
                         status : 200,
                     },
                     data : result
                 })
             }).catch(error => console.log(error))

        }else if(filtro){
            console.log('se esta ejecutando filtro')
            
            if (Number(category)) {
                console.log('este es el filtro ' + filtro)
                console.log(category)

                db.Products.findAll({
                    limit : 6,
                    offset : Number(limite),
                    include:[
                    {association:'imagenes'},
                    {association: 'categoria'},
                ],
                    where : {
                        category_id : Number(category)
                    },
                    order : [
                        ['price' , filtro]
                    ],
                    
                   
            })
                 .then(result => {
                     return res.status(200).json({
                         meta : {
                             status : 200,
                         },
                         data : result
                     })
                 }).catch(error => console.log(error))
             
        
    
            }

            db.Products.findAll({
                limit : 6,
                offset : Number(limite),
                include:[
                {association:'imagenes'},
                {association: 'categoria'},
            ],
                order : [
                    ['price' , filtro]
                ],
                
                
               
            })
             .then(result => {
                 return res.status(200).json({
                     meta : {
                         status : 200,
                     },
                     data : result
                 })
             }).catch(error => console.log(error))
    

        }else{
            console.log("no se esta ejecutando nada")
            db.Products.findAll({limit : 6,
                offset : Number(limite),
                include:[
                {association:'imagenes'},
                {association: 'categoria'},
                
            ],
            order : [
                ['price' , 'DESC']
            ],
        })
             .then(result => {
                 return res.status(200).json({
                     meta : {
                         status : 200,
                     },
                     data : result
                 })
             }).catch(error => console.log(error))
    
        }    

    },
    removeProduct : (req,res) => {
        db.Products.destroy({where : { id : req.params.id}})
        .then(result => {
            return res.status(200).json({
                status : 200,
                msg : 'Producto borrado correctamente'
            })
        }).catch(error => console.log(error))

    }

}