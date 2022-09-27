
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

  return Cartitems;
};
