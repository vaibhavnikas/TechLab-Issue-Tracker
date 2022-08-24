module.exports.home = function(req, res){
    return res.render('home', {
        title: "Tech Lab | Home"
    });
}