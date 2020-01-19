const multer = require ('multer');
const path = require ('path');
const Datauri = require ('datauri');

const dUri = new Datauri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('avatar');
module.exports = { multerUploads, dataUri };