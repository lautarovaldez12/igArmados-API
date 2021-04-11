module.exports = (sequelize, dataTypes) => {

    const alias = 'Products';

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        name : {
            type : dataTypes.STRING(100),
            allowNull : false,
            validate : {
                notEmpty : true,
                notNull : true,
                len : [10]

            }
        },
        price : {
            type : dataTypes.DECIMAL,
            allowNull : false,
            validate : {
                isNumeric : true,
                notNull : true,
                notEmpty : true,  
            }
        },
        insale : {
            type : dataTypes.SMALLINT,
            allowNull : false,
            validate : {
                isNumeric : true,
                notNull : true,
                notEmpty : true
            }
        },
        stock : {
            type : dataTypes.SMALLINT,
            allowNull : false,
            validate : {
                isNumeric : true,
                notNull : true,
                notEmpty : true
            }
        },
        description : {
            type : dataTypes.STRING(500),
            allowNull : false,
            validate : {
                notNull : true,
                notEmpty : true,
                len : {
                    args : [20,500],
                    msg : 'Debe tener como minimo 20 caracteres y como maximo 500'
                },
            }
        },
        features : {
            type : dataTypes.STRING(500),
            allowNull : false,
            validate : {
                notNull : true,
                notEmpty : true,
                len : {
                    args : [20,500],
                    msg : 'Debe tener como minimo 20 caracteres y como maximo 500'
                },
            }
        },
        model:{
            type: dataTypes.STRING(100),
            allowNull:false,
            validate : {
                notEmpty : true,
                notNull : true
            }
        },
        guarantee_id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                isNumeric : true,
                notNull : true,
                notEmpty : true
            }
        },
        mark_id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                isNumeric : true,
                notNull : true,
                notEmpty : true
            }
        },
        component_id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                isNumeric : true,
                notNull : true,
                notEmpty : true
            }
        },
        category_id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                isNumeric : true,
                notNull : true,
                notEmpty : true
            }
        }
        
    }

    const config = {
        tableName : "products",
        timestamps : false,
        underscored: true
    };




    const Product = sequelize.define(alias,cols,config)

    Product.associate = (models)=>{
        Product.belongsToMany(models.Users,{
            as : 'productos',
            through : "cart",
            foreignKey : 'product_id',
            otherKey : "user_id"
        })

        Product.belongsTo(models.Categorys,{
            as : 'categoria',
            foreignKey : 'category_id'
        })

        Product.belongsTo(models.Components,{
            as : 'componente',
            foreignKey : 'component_id'
        })

        Product.belongsTo(models.Marks,{
            as : 'marca',
            foreignKey : 'mark_id'
        })

        Product.hasMany(models.Images,{
            as : 'imagenes',
            foreignKey : 'product_id'
        })

        Product.belongsTo(models.Guarantees,{
            as : 'garantia',
            foreignKey : 'guarantee_id'
        })
                
    }

    return Product
}