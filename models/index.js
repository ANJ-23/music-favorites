const User = require('./user');
const Songs = require('./songs');

User.hasMany(Songs, { //one-to-many relationship
  foreignKey: 'user_id',//User's key will be primary key 
  onDelete: 'CASCADE'//if user deletes, songs will delete 
});

Songs.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Songs };