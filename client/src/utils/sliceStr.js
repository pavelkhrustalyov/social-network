export default (str, limit = 15) => {
    if (str.length > limit) {
        return str.slice(0, limit) + '...'
    }
    return str;
}