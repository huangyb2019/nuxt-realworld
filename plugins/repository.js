import createRepository from "../api/createRepository";

const repository = (ctx,inject) => {
  const repositoryWithAxios = createRepository(ctx)
  inject('repository', repositoryWithAxios)
}
export default repository
