export const usersPipeline = (search: string) => {
  return [
    {
      $search: {
        index: 'searchUser',
        regex: {
          query: search,
          path: ['email', 'username'],
          allowAnalyzedField: true,
        },
      },
    },
  ];
};
