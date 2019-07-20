module.exports = function(sequelize, DataTypes) {
    var joinRide = sequelize.define("joinRide", {

    });

    joinRide.associate = function(models) {
        // We're saying that a Driver-ride should belong to a User
        // A Driver-ride can't be created without a User due to the foreign key constraint
        joinRide.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        joinRide.belongsTo(models.driverRide, {
            foreignKey: {
              allowNull: false
            }
          });
  
      };

    return joinRide;
  };