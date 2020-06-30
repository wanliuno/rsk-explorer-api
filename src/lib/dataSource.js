
import Setup from './Setup'
export const setup = async ({ log, skipCheck, skipCollections } = {}) => {
  try {
    const setup = await Setup({ log } = {})
    if (!skipCollections) await setup.createCollections()
    return setup.start(skipCheck)
  } catch (err) {
    return Promise.reject(err)
  }
}
export const dataSource = setup
export default setup
