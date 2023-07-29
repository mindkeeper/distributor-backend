module.exports = function getPagination(count, page, limit) {
  const totalPage = Math.ceil(parseInt(count) / parseInt(limit));
  const current = parseInt(page);
  return {
    current_page: current,
    total_page: totalPage,
    total_data: count,
  };
};
