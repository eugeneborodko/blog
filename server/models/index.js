const User = require('./user-model')
const Post = require('./post-model')
const UserRole = require('./user-role-model')
const Comment = require('./comment-model')
const Role = require('./role-model')
const Token = require('./token-model')

User.hasMany(Post)
Post.belongsTo(User)

Post.hasMany(Comment)
Comment.belongsTo(Post)

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(UserRole)
UserRole.belongsTo(User)

Role.hasMany(UserRole)
UserRole.belongsTo(Role)

User.hasMany(Token)
Token.belongsTo(User)