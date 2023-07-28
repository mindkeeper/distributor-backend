module.exports = function getPagination(count, req) {
  const limit = req.query.limit;
  const totalPage = Math.ceil(parseInt(count) / parseInt(limit));
  const current = parseInt(req.query.page);
  const prev = current > 1 ? current - 1 : null;
  const next = current < totalPage ? current + 1 : null;

  const baseUrl = `${req.protocol}://${req.hostname}${
    req.originalUrl.split("?")[0]
  }`;
  const nextUrl = next ? `${baseUrl}?page=${next}&limit=${limit}` : null;
  const prevUrl = prev ? `${baseUrl}?page=${prev}&limit=${limit}` : null;

  return {
    current_page: current,
    total_page: totalPage,
    total_data: count,
    prev: prevUrl,
    next: nextUrl,
  };
};
