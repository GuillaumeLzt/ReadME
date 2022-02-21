const db = require("../models/index");
const Photo = db.photo;
const User = db.user;
const Post = db.post;


exports.getPostOnUserProfil = async (req, res) => {
    try {
        const newPost = new Post({
            desc: req.body.desc,
            username: req.cookies.username,
            //img: req.file.filename,
            //imageUrlPath: `${req.protocol}://${req.get("host")}/public/uploads/${req.file.filename}`,
        })
        await newPost.save();

    } catch (error) {
        // gestion des erreurs
        //res.status(500).send({ message: error.message || "Error Occured" });
        console.log(error);
    }

    res.redirect('/userProfil');
};


exports.sendPostOnUserProfil = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.cookies.username }).exec();
        const userPost = await Post.find({ username: req.cookies.username }).exec();
        const userPhotos = await Photo.find({ username: req.cookies.username }).exec();

        res.render('userProfil', { user: user, userPost: userPost, userPhotos: userPhotos });
    } catch (error) {
        //gestion des erreurs
        res.status(500).send({ message: error.message || "Error Occured" });
    }

};