module.exports = function filterArticles(articles, category) {
  return articles.filter(article => {
    if (article.categories === undefined || article.categories === null) {
      return false
    } else {
      return article.categories.filter(_category => {
        return _category.pageBase.title === category
      }).length >= 1;
    }
  });
}
