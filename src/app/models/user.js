module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('User', {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      rg: DataTypes.STRING,
      cpf: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING
    });

    // UserModel.associate = function(models) {
    //   Users.hasOne(models.login, {
    //       foreignKey: 'user_id',
    //       as: 'loginDetails'
    //   });
    // };

    // UserModel.associate = function(models) {
    //     Users.hasMany(models.customer_query, {
    //         foreignKey: 'user_id',
              // through: 'user_techs', 
    //         as: 'queryDetails'
    //     });
    // };
  
    return UserModel;
}