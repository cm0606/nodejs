const BLOG = require('../models/blog');
const COMMENT = require('../models/comment');
async function handleCreateNewBlog(req, res) {
    const { title, body } = req.body;
    const blog = await BLOG.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
}
async function handleCommentOnBlog(req, res) {
    const { content } = req.body;
    const comment = await COMMENT.create({
        content,
        blogId: req.params.id,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${comment.blogId}`);

}
async function handleGetBlogContent(req, res) {

    const blog = await BLOG.findById(req.params.id).populate('createdBy');
    const comments = await COMMENT.find({ blogId: blog._id }).populate('createdBy');
    return res.render('blog', { user: req.user, blog: blog, comments: comments })
}
module.exports = { handleCreateNewBlog, handleGetBlogContent, handleCommentOnBlog };