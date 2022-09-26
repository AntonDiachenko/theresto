
module.exports = (sequelize, Datatypes) => {
  const Cartitems = sequelize.define("Cartitems", {
    quantity: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: Datatypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  // NEEDS USERID && MENUITEMID FK

  // Test found online
  /*
  (async function test(){
    try {
      await sequelize.sync({ force: true });
    } catch (error) {
      console.log(error);
    } finally {
      await sequelize.close();
    }
  }) ();
  */

  // Users.associate =(models)=>{
  //     Users.hasMany(models.Comments,{
  //         onDelete:"cascade",
  //     })
  // }

  return Cartitems;
};
