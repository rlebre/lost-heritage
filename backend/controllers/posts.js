const Post = require('../models/post');
const Contributor = require('../models/contributor');

const { normalizeErrors } = require('../helpers/mongoose');

exports.createPost = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const {
        contributorName,
        contributorEmail,
        contributorCity,
        title,
        details,
        county,
        lat,
        lng,
        stories,
        suggestedFunctions,
        isRecovered,
        images } = req.body;


    Contributor.findOne({ email: contributorEmail }, (err, foundContributor) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (foundContributor) {
            foundContributor.set({
                name: contributorName,
                city: contributorCity
            })
        } else {
            foundContributor = new Contributor({ name: contributorName, email: contributorEmail, city: contributorCity });
        }

        foundContributor.save((err) => {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            const newPost = new Post({ contributor: foundContributor, title, details, county, lat, lng, stories, suggestedFunctions, isRecovered, images })

            Post.create(newPost, (err, createdPost) => {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }

                res.json(createdPost);
            });
        });
    });


    // db.collection('lost-heritage').doc(fields.id).set({
    //     id: fields.id,
    //     title: fields.title,
    //     details: fields.details,
    //     location: fields.location,
    //     lat: Number(fields.lat),
    //     lng: Number(fields.lng),
    //     date: parseInt(fields.date),
    //     isRecovered: fields.isRecovered,
    //     imageUrls
    // }).then(
    //     response => {
    //         res.send("Post added" + fields.id)
    //     },
    //     error => {
    //         console.log(error);

    //     }
    // );

};


exports.getAllPosts = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let posts = [];

    db.collection('lost-heritage').orderBy('date', 'desc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            posts.push(doc.data());
        })
        res.send(posts);
    })
};

exports.getPostDetails = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const postId = req.params.id;
    let post = {};

    db.collection('lost-heritage').where('id', '==', postId).get().then((snapshot) => {
        if (snapshot.empty) {
            return res.send(post);
        }

        snapshot.forEach((doc) => {
            post = doc.data();
            return res.send(post);
        });
    });
};

exports.getFilteredPosts = (req, res) => {
    const { counties, orderBy, orderType, searchString } = req.body;
    console.log({ counties, orderBy, orderType, searchString });

    if (!(counties || (orderBy && orderType) || searchString)) {
        return res.status(422).send({ errors: [{ title: "Data missing", detail: "Provide filters" }] });
    }

    if (!["asc", "desc"].includes(orderType.toLowerCase())) {
        return res.status(422).send({ errors: [{ title: "Data missing", detail: "Order type must be 'asc' or 'desc'" }] });
    }

    if (!["date", "location", "likes"].includes(orderBy.toLowerCase())) {
        return res.status(422).send({ errors: [{ title: "Data missing", detail: "Sorting must be one of 'date', 'likes' or 'location'" }] });
    }

    res.set('Access-Control-Allow-Origin', '*');

    let posts = [];

    db.collection('lost-heritage').orderBy(orderBy.toLowerCase(), orderType.toLowerCase()).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            posts.push(doc.data());
        })
        res.send(posts);
    })
};