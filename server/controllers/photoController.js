const db = require("../models/index");
const Photo = db.photo;
const User = db.user;







exports.sendPost = async (req, res) => {
    try {
        const newPost = new Photo({

            username: req.cookies.username,
            img: req.file.filename,
            imageUrlPath: `${req.protocol}://${req.get("host")}/public/uploads/${req.file.filename}`,
        })
        await newPost.save();

    } catch (error) {
        // gestion des erreurs
        res.status(500).send({ message: error.message || "Error Occured" });
    }
    res.redirect('/userPhotos');
};

exports.getUserPhoto = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.cookies.username }).exec();
        const userPhotos = await Photo.find({ username: req.cookies.username }).exec();

        res.render('userPhotos', { user: user, userPhotos: userPhotos });
    } catch (error) {
        //gestion des erreurs
        res.status(500).send({ message: error.message || "Error Occured" });
    }

};


