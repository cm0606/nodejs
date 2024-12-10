const express = require('express');
const path = require('path')
const router = express.Router();
const multer = require('multer');
const { handleCreateNewBlog, handleGetBlogContent, handleCommentOnBlog } = require('../controllers/blog')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage })
router
    .post('/', upload.single('coverImage'), handleCreateNewBlog)
router.
    route('/add-new').
    get((req, res) => {
        return res.render('addBlog', { user: req.user });
    })
router
    .post('/comment/:id', handleCommentOnBlog)
router.get('/:id', handleGetBlogContent)



module.exports = router;