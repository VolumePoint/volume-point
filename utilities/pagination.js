class Pagination{
	paginate(records, page = 1, pageSize = 5) {
		var data = {
			page : page,
			nextPage:parseInt(page)+1,
			prevPage:Math.max(page-1, 0),
			records : records.slice(pageSize * (page - 1), pageSize * page),
		}

		return data;
	}
}

module.exports = Pagination;