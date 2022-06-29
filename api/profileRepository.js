export const profileRepository = (axios) => ({
  getProfile(userName) {
    return axios.$get(`/profiles/${userName}`)
  },
  followUser(userName) {
    return axios.$post(`/profiles/${userName}/follow`)
  },
  unFollowUser(userName) {
    return axios.$delete(`/profiles/${userName}/follow`)
  },
})
