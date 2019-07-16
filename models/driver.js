module.exports = function(sequelize, DataTypes) {
 
    var driverRide = sequelize.define("driverRide", {
      departure_time: {
          type: DataTypes.DATE,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      }
    });

    driverRide.associate = function(models) {
        // We're saying that a Driver-ride should belong to a User
        // A Driver-ride can't be created without a User due to the foreign key constraint
        driverRide.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    

    return driverRide;
  };
  