module.exports = (sequelize, Datatypes) => {
  const Payments = sequelize.define("Payments", {
    createdAt: {
      type: Datatypes.DATE,
      allowNull: false,
    },
  });

  // NEEDS USER && ORDER FK

  // Users.associate =(models)=>{
  //     Users.hasMany(models.Historys,{
  //         onDelete:"cascade",
  //     })
  // }

  return Payments;
};
