function User(user) {
    this.id = user.id;
    this.name = user.name;
    this.introduction = user.introduction;
    this.profileImage = user.profileImage;
    this.profileLink = user.profileLink;
    return this;
}
module.exports = User;