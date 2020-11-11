const aws = require('aws-sdk');
const multer = require('multer');
const s3Storage = require('multer-sharp-s3');
const config = require('../config');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');

aws.config.update({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_ACCESS_KEY_SECRET,
    region: 'eu-west-3'
});

var s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG allowed.'), false);
    }
}

var upload = multer({
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    storage: s3Storage({
        ACL: 'public-read',
        s3,
        Bucket: 'lost-heritage',
        Metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        Key: function (req, file, cb) {
            let { email, title } = req.query;

            const uuid = uuidv4().toString();

            email = email ? email : uuid;
            title = title ? title : uuid;

            cb(null, md5(file.originalname.concat(title).concat(email)))
        },
        resize: {
            width: 100
        }
    })
});

module.exports = upload;