export const tagRepository = (axios) => ({
  getTagList() {
    return axios.$get('/tags')
  },
})
