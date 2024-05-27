
const sequelize = require("../Services/config");
const { DataTypes, UUID } = require("sequelize");
const Sq = require("sequelize");


const Post = sequelize.define(
    'post', {
    post_id: {
        type: Sq.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    post_name: {
        allowNull: false,
        type: Sq.STRING,
    },
}
);

const Client = sequelize.define(
    'client', {
    client_id: {
        type: Sq.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    client_name: {
        allowNull: false,
        type: Sq.STRING,
    },
}
);

const Test = sequelize.define(
    'test', {
    test_id: {
        type: Sq.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    test_uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
    },
    test_name: {
        allowNull: false,
        type: Sq.STRING,
    },
}
)
// Define association
Client.hasMany(Post, {
    as: "ClientPost",
    foreignKey: "client_id", sourceKey: "client_id"
});
// Post.belongsTo(Client, { foreignKey: "client_id" });
// sequelize.sync({ alter: true });
module.exports = {
  Post,Client,Test
};
