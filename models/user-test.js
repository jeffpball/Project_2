module.exports = function(sequelize, DataTypes) {
    var userTest = sequelize.define("userTest", {
      userName:{
          type: DataTypes.STRING,
          allowNull: false,

      },
      email_address: {
          type: DataTypes.STRING,
          allowNull: false,
          validate:{
              isEmail:true,
          }
      },
      password: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      gender: {
           type: DataTypes.STRING,
           allowNull: true,
      },
      rating: {
          type: DataTypes.DECIMAL,
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

    userTest.associate = function(models) {
        // Associating userTest with driver_ride
        // When an userTest is deleted, also delete any associated driver_ride
        userTest.hasMany(models.driverRide, {
          onDelete: "cascade"
        });
      };
    
    

    return userTest;
  };
