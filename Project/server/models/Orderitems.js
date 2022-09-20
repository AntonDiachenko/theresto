module.exports = (sequelize, Datatypes) => {
  const Orderitems = sequelize.define("Orderitems", {
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

    quantity: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
  });

  // NEEDS ORDER && MENUITEMS FK

  // Users.associate =(models)=>{
  //     Users.hasMany(models.Historys,{
  //         onDelete:"cascade",
  //     })
  // }

  return Orderitems;
};
