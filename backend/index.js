const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
let inspect = require('util').inspect;
let Busboy = require('busboy');
let path = require('path');
let os = require('os');
let fs = require('fs');
let UUID = require('uuid-v4');

const app = express();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "forgotten-heritage-dev.appspot.com"
});
const db = admin.firestore()
let bucket = admin.storage().bucket();

app.get('/posts', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let posts = [];

    db.collection('lost-heritage').orderBy('date', 'desc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            posts.push(doc.data());
        })
        res.send(posts);
    })
})

app.post('/createPost', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let fields = {};
    let filedataList = [];
    let uuid = UUID();
    var busboy = new Busboy({ headers: req.headers });
    let uploadedFiles = [];
    let fileCount = 0;

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        let filepath = path.join(os.tmpdir(), filename);
        file.pipe(fs.createWriteStream(filepath));
        filedataList.push({ filepath, mimetype });
        fileCount++;
    });

    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        fields[fieldname] = val;
    });

    busboy.on('finish', function () {
        filedataList.forEach((filedata) => {
            bucket.upload(
                filedata.filepath,
                {
                    uploadType: 'media',
                    metadata: {
                        metadata: {
                            contentType: filedata.mimetype,
                            firebaseStorageDownloadTokens: uuid
                        }
                    }
                },
                (err, uploadedFile) => {
                    if (!err) {
                        uploadedFiles.push(uploadedFile);

                        if (uploadedFiles.length >= fileCount) {
                            createDocument(uploadedFiles);
                        }
                    }
                }
            );
        });

        function createDocument(uploadedFiles) {
            let imageUrls = [];
            uploadedFiles.forEach((uploadedFile) => {
                imageUrls.push(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`)
            });

            db.collection('lost-heritage').doc(fields.id).set({
                id: fields.id,
                title: fields.title,
                details: fields.details,
                location: fields.location,
                lat: Number(fields.lat),
                lng: Number(fields.lng),
                date: parseInt(fields.date),
                imageUrls
            }).then(
                response => {
                    res.send("Post added" + fields.id)
                },
                error => {
                    console.log(error);

                }
            );
        }
    });



    req.pipe(busboy);
})

app.listen(process.env.PORT || 3000)