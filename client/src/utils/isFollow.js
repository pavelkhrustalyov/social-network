export default (currentUser, myUser) => {
    return currentUser.followers.find((user) => user._id === myUser._id)
}