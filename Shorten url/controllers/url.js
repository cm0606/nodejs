const shortid = require("shortid");
const URL = require("../models/url");
async function handleOpenUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitHistory:
                {
                    timestamp: Date.now()
                }
            }
        }
    )
    res.redirect(entry.url);

}
async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ err: "url is required" });
    }
    const shortId = shortid.generate();
    await URL.create({
        shortId: shortId,
        url: body.url,
        visitedHistory: [],
        createdBy: req.user._id
    });
    return res.render('home', { id: shortId });



};
async function handleAnalyseVisit(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    return res.json(
        {
            totalClicks: entry.visitHistory.length,
            Analytics: entry.visitHistory
        }
    );
}
async function handleGetAllUrls(req, res) {
    const allurls = await URL.find({});
    return res.json(allurls);

}
module.exports = { handleGenerateShortUrl, handleOpenUrl, handleAnalyseVisit, handleGetAllUrls };