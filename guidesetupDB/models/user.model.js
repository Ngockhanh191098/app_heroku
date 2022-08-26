
module.exports = ( sequelize, DataTypes ) => {
    const User = sequelize.define(
        "User",
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            hashPwd: {
                type: DataTypes.STRING,
                allowNull: true
            },
            avatar: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            iamRole: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            idFacebook: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            timestamp: true,
        }
    );

    return User;
}