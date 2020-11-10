const Post = require('../models/post');
const Contributor = require('../models/contributor');
const Comment = require('../models/post-comment');

const { normalizeErrors } = require('../helpers/mongoose');

exports.createPost = (req, res) => {
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
        images,
        newsletterAgree
    } = req.body;


    Contributor.findOne({ email: contributorEmail }, (err, foundContributor) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (foundContributor) {
            foundContributor.name = contributorName;
            foundContributor.city = contributorCity;
            foundContributor.newsletterAgree = newsletterAgree;
        } else {
            foundContributor = new Contributor({ name: contributorName, email: contributorEmail, city: contributorCity, newsletterAgree });
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
};


exports.getPublicPosts = (req, res) => {
    Post.find({ approved: true }, (err, posts) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!posts) {
            return res.json([]);
        }

        res.json(posts);
    });
};

exports.getAllPosts = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!posts) {
            return res.json([]);
        }

        res.json(posts);
    });
};

exports.getPostDetails = (req, res) => {
    const postId = req.params.id;

    Post.findById(postId, (err, post) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!post) {
            return res.status(422).send({ errors: [{ title: 'Invalid Post ID!', detail: 'Post does not exist.' }] });
        }

        res.json(post);
    });
};

exports.getFilteredPosts = (req, res) => {
    const { counties, orderBy, orderType, searchString } = req.body;

    if (!(counties || (orderBy && orderType) || searchString)) {
        return res.status(422).send({ errors: [{ title: "Data missing", detail: "Provide filters" }] });
    }

    if (!["asc", "desc"].includes(orderType.toLowerCase())) {
        return res.status(422).send({ errors: [{ title: "Data missing", detail: "Order type must be 'asc' or 'desc'" }] });
    }

    if (!["date", "location", "likes"].includes(orderBy.toLowerCase())) {
        return res.status(422).send({ errors: [{ title: "Data missing", detail: "Sorting must be one of 'date', 'likes' or 'location'" }] });
    }

    let posts = [];

    db.collection('lost-heritage').orderBy(orderBy.toLowerCase(), orderType.toLowerCase()).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            posts.push(doc.data());
        })
        res.send(posts);
    })
};

exports.likePost = (req, res) => {
    const postId = req.params.id;

    if (!postId) {
        return res.status(422).send({ errors: [{ title: "Data missing", detail: "Provide Post ID" }] });
    }

    Post.findByIdAndUpdate(postId, { $inc: { 'likes': 1 } }, (err, post) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!post) {
            return res.status(422).send({ errors: [{ title: 'Invalid Post ID!', detail: 'Post does not exist.' }] });
        }

        post.likes++;
        res.json(post);
    });
};

exports.commentPost = async (req, res) => {
    const postId = req.params.id;
    const { comment } = req.body;

    if (!postId || !comment) {
        return res.status(422).send({ errors: [{ title: "Data missing", detail: "Provide Post ID and Comment" }] });
    }

    const commentObj = new Comment({ comment });
    const newComment = await Comment.create(commentObj);

    if (!newComment) {
        return res.status(422).send({ errors: [{ title: "Error", detail: "Error creating comment." }] });
    }

    Post.findByIdAndUpdate(postId, { $push: { 'comments': newComment } }, (err, post) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!post) {
            return res.status(422).send({ errors: [{ title: 'Invalid Post ID!', detail: 'Post does not exist.' }] });
        }

        newComment.set({ post });
        newComment.save();

        post.comments.push(newComment);
        res.json(post);
    });
};

exports.filterPosts = (req, res) => {
    const { countyList, sortBy, sortType } = req.body;

    if (!countyList && !sortBy && !sortType) {
        return res.status(422).send({ errors: [{ title: 'Data missing', detail: 'Provide countyList, sortBy and/or sortType.' }] });
    }

    let dbQuery = Post.find({ 'county': { $in: countyList } });

    if (sortBy || sortType) {
        const sort = {};
        sortType = 'date';
        sort[sortBy] = (sortType |= -1);
        dbQuery.sort(sort)
    }

    dbQuery.exec((err, posts) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!posts) {
            return res.status(422).send({ errors: [{ title: 'Invalid Post ID!', detail: 'Post does not exist.' }] });
        }

        res.send(posts)
    });
};

exports.searchPosts = (req, res) => {
    const { query, sortBy, sortType } = req.body;

    let dbQuery = Post.find({ $text: { $search: query } });

    if (!query) {
        return res.status(422).send({ errors: [{ title: "Data missing", detail: "Provide search query." }] });
    }

    if (sortBy && sortType) {
        const sort = {};
        sort[sortBy] = sortType;

        dbQuery.sort(sort)
    }

    dbQuery.exec((err, posts) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!posts) {
            return res.status(422).send({ errors: [{ title: 'Invalid Post ID!', detail: 'Post does not exist.' }] });
        }

        res.send(posts)
    });
};