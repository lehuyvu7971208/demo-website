export const POST_SORT_OPTIONS = [
  {
    title: "Bỏ sắp xếp",
    values: {
      order: null,
      sortBy: null,
    },
  },
  {
    title: "Tiêu đề A -> Z",
    values: {
      order: "asc",
      sortBy: "title",
    },
  },

  {
    title: "Tiêu đề Z -> A",
    values: {
      order: "desc",
      sortBy: "title",
    },
  },

  {
    title: "Lượt xem tăng dần",
    values: {
      order: "asc",
      sortBy: "views",
    },
  },

  {
    title: "Lượt xem giảm dần",
    values: {
      order: "desc",
      sortBy: "views",
    },
  },
];

export const POST_PER_PAGE = 10;

export const COMMENT_PER_PAGE = 10;
