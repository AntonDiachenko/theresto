module.exports = (sequelize, Datatypes) => {
  const Categories = sequelize.define("Categories", {
    name: {
      type: Datatypes.STRING(255),
      allowNull: false,
      validate: {
        len: [2, 20],
      },
    },
  });

  Categories.associate = (models) => {
    Categories.hasMany(models.Menuitems, {});
  };

  return Categories;
};
