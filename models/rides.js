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
      zip_code_pickup: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 5]
        }
      },  
      zip_code_dropoff: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 5]
        }
      },  
      max_number_riders: {
           type: DataTypes.INTEGER,
           allowNull: false,
           validate: {
            len: [1,4]
          }
      },
      actual_number_riders: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          len: [1, 4]
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
        driverRide.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return driverRide;
  };