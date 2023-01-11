// We can use exports but module.exports works universally so we're using module.exports for now
module.exports.home = function(req, res){
    return res.end(
        `<h1>This is my temporary ugly home page<h1>`
    )
};