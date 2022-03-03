class UserDto {
  constructor({ email, id }, roleId) {
    this.email = email
    this.id = id
    this.roleId = roleId
  }
}

module.exports = UserDto
