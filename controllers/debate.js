var mongoose = require('mongoose')
  , debate = mongoose.model('debate')

exports.create = function (req, res) {
  var debate = new debate(req.body)
    , article = req.article

  debate._user = req.user

  debate.save(function (err) {
    if (err) throw new Error('Error while saving debate')
    article.debates.push(debate._id)
    article.save(function (err) {
      if (err) throw new Error('Error while saving article')
      res.redirect('/articles/'+article.id+'#debates')
    })
  })
}