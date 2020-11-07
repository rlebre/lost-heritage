const upload = require('../services/image-upload');
const arrayUpload = upload.array('image');

exports.imageUpload = (req, res) => {
    arrayUpload(req, res, (err) => {
        if (err) {
            return res.status(422).send({ errors: [{ title: "Image upload error.", detail: err.message }] });
        }

        return res.json({ 'imagesUrls': req.files.map(file => file.location) });
    })
};
