const db = require("../database/models");
 module.exports = {
     getComponents : (req,res) => {
         db.Components.findAll()
         .then(result => {
             res.status(200).json({
                 meta : {
                     status : 200,
                     amount : result.length 
                 },
                 data : result
             })
         }).catch(error => console.log(error))
     },
     getOneComponent : (req,res) => {
         db.Components.findByPk(req.params.id)
         .then(result => {
             if(result){
                 res.status(200).json({
                     meta : {
                         status : 200
                     },
                     data : result
                 })
             }else {
                 res.status(404).json({
                     status : 404,
                     msg : 'Component not found'
                 })
             }
         }).catch(error => console.log(error))
     }
 }