module.exports = (sequelize, Datatypes) => {
  const Menuitems = sequelize.define("Menuitems", {
    itemname: {
      type: Datatypes.STRING(255),
      allowNull: false,
      validate: {
        len: [2, 40],
      },
    },

    description: {
      type: Datatypes.STRING(1000),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a description",
        },
      },
    },
    price: {
      type: Datatypes.DECIMAL(10, 2),
      allowNull: false,
    },

    photoURL: {
      type: Datatypes.STRING(1000),
      allowNull: true,
    },

    // isfav:{
    //   type:Datatypes.BOOLEAN,
    //   defaultValue:false,
    // },
    // iscart:{
    //   type:Datatypes.BOOLEAN,
    //   defaultValue:false,
    // }
})


Menuitems.associate =(models)=>{
      Menuitems.hasMany(models.Favorites,{
          onDelete:"cascade",
      });
    //   Menuitems.hasMany(models.Cartitems,{
    //     onDelete:"cascade",
    // })
  }

  


  // Menuitems.associate =(models)=>{
  //     Menuitems.hasMany(models.Orderitems,{
  //         onDelete:"cascade",
  //     })
  // }

  return Menuitems;
};
