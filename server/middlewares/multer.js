const multer = require("multer");

//image upload
//dictionnaire mime types pour gerer les extensions
const MIMETYPES = {
    "image/jpeg": "jpeg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
};

// destination des fichiers dans le repertoire + nom de fichier unique

const storage = multer.diskStorage({
    //repertoire de stockage fichier ./public/img/

    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    // filename = nom attribué au fichier importer + extension
    filename: function (req, file, cb) {
        //supprimer les espaces dans le nom du fichier
        const name = file.originalname.split(" ").join("_");
        const extension = MIMETYPES[file.mimetype];
        cb(null, name + "_" + Date.now() + "." + extension);
    },
});

//exportation du middleware
module.exports = multer({ storage }).single("image");;