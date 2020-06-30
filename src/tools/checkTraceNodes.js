
import config from '../lib/config'
import { Nod3 } from 'nod3'

check(config.source).then(() => {
  console.log('done')
  process.exit(0)
})

async function check (sources) {
  try {
    sources = (!Array.isArray(sources)) ? [sources] : sources
    for (let source of sources) {
      let { url } = source
      console.log(url)
      let nod3 = new Nod3(new Nod3.providers.HttpProvider(url))
      let { hash } = await nod3.eth.getBlock('latest')
      if (!hash) throw new Error(`Cannot get last block from ${url}`)
      let trace = await nod3.trace.block(hash)
      if (!trace) throw new Error(`Invalid trace from ${url}`)
    }
  } catch (err) {
    console.error(err)
    process.exit(9)
  }
}
