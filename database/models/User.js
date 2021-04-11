module.exports = (sequelize, dataTypes) => {

    const alias = "Users"; //defino el alias del modelo

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : dataTypes.STRING(45),                                          
            allowNull : false,
            validate : {
                notEmpy : true,
                notNull : true,
            }
        },
        last_name : {
            type : dataTypes.STRING(45),                                          
            allowNull : false,
            validate : {
                notEmpy : true,
                notNull : true,
            }
        },
        email : {
            type : dataTypes.STRING(100),
            allowNull : false,
            validate : {
                notEmpy : true,
                notNull : true,
                isEmail : true
            }
        },
        password : {
            type : dataTypes.STRING(255),
            allowNull : false,
            validate : {
                notEmpy : true,
                notNull : true,
                len : [6,12]
            }
        },
        avatar : {
            type : dataTypes.STRING(100),
            allowNull : true,
           
        },
        rol_id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpy : true,
                isNumeric : true
            }
        }
    }; // defino las propiedades de los datos de la tabla

    const config = {
        tableName : "users",
        timestamps : false,
        underscored: true
    };

    const User = sequelize.define(alias, cols, config); // utilizo el metodo define de sequelize para definir las 3 constantes creadas

    User.associate = (models)=>{
        User.belongsTo(models.Rols, {
            as : "roles",
            foreignKey : "rol_id"
        })
        
        User.belongsToMany(models.Products,{
            as : 'usuario',
            through : "cart",
            foreignKey : 'user_id',
            otherKey : "product_id"
        })

        
    }

    return User;
};