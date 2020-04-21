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
  
    return UserModel;
}