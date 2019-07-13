module.exports = function(sequelize, DataTypes) {
    var driverRide = sequelize.define("driverRide", {
      departure_time: {
          type: DataTypes.TIME,
          allowNull: false,
      },
      pick_up_address: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      drop_off_address: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      max_number_riders: {
           type: DataTypes.INTEGER,
           allowNull: false,
           validate: {
            len: [1,4]
          }
      },
      female_ride_only: {
          type: DataTypes.BOOLEAN,
          allowNull: true,

      },
    });

    driverRide.associate = function(models) {
        // We're saying that a Driver-ride should belong to a User
        // A Driver-ride can't be created without a User due to the foreign key constraint
        driverRide.belongsTo(models.userTest, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    

    return driverRide;
  };
  