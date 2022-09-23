module.exports = (sequelize, Datatypes)=>{
    const Users = sequelize.define("Users",{
        username:{
            type: Datatypes.STRING(100),
            allowNull: false,
        },
        email:{
            type: Datatypes.STRING(320),
            allowNull: false
        },
        password:{
            type: Datatypes.STRING,
            allowNull: false,

        },
        phone:{
            type: Datatypes.STRING,
            allowNull: false,

        },
        role:{
            type: Datatypes.ENUM({
                values: ['admin', 
                // 'moderator',
                 'user']
              }),
            
            defaultValue:"user",
        },


    });


    // Users.associate =(models)=>{
    //     Users.hasMany(models.Historys,{
    //         onDelete:"cascade",
    //     })
    // }

    return Users;
}