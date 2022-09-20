module.exports = (sequelize, Datatypes) => {
  const Orders = sequelize.define("Orders", {
    dtPlaced: {
      type: Datatypes.DATE,
      allowNull: false,
    },
    total: {
      type: Datatypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },

    paymentInfo: {
      type: Datatypes.STRING(255),
      allowNull: false,
    },
  });

  // NEEDS USERID FK

  // Orders.associate =(models)=>{
  //     Orders.hasMany(models.Orderitems,{
  //         onDelete:"cascade",
  //     })
  // }

  // Orders.associate =(models)=>{
  //     Orders.hasOne(models.Payments,{
  //         onDelete:"no action",
  //     })
  // }

  return Orders;
};
