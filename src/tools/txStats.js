import dataSource from '../lib/dataSource.js'
import { getDbBlocksCollections } from '../lib/blocksCollections'
import { newBigNumber, serialize } from '../lib/utils'
// import { info, orange, reset, error, ansiCode } from '../lib/cli'
const fromBlock = parseInt(process.argv[2])
const toBlock = parseInt(process.argv[3])
if (!fromBlock || !toBlock) help()
if (fromBlock > toBlock) help(`'fromBlock' must be less than 'toBlock'`)
const DATA = {
  txs: 0,
  gas: newBigNumber(0),
  gasPrice: newBigNumber(0),
  gasUsed: newBigNumber(0),
  fee: newBigNumber(0)
}
console.log(`from block: ${fromBlock} to block: ${toBlock}`)
getData(fromBlock, toBlock)

async function getData (fromBlock, toBlock) {
  try {
    let { db } = await dataSource()
    let collections = getDbBlocksCollections(db)
    let { Txs } = collections
    let query = {
      $and: [
        { blockNumber: { $gte: fromBlock } },
        { blockNumber: { $lte: toBlock } },
        { txType: { $ne: 'remasc' } }]
    }
    let cursor = Txs.find(query)
    DATA.txs = await Txs.countDocuments(query)

    await cursor.forEach((tx) => {
      getTxData(tx)
    })
    printObj(DATA)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(9)
  }
}

function getTxData (tx) {
  let { gas, gasPrice, receipt } = tx
  let { gasUsed } = receipt
  gas = newBigNumber(gas)
  gasPrice = newBigNumber(gasPrice)
  gasUsed = newBigNumber(gasUsed)
  let fee = gasUsed.multipliedBy(gasPrice)
  DATA.gas = DATA.gas.plus(gas)
  DATA.gasPrice = DATA.gasPrice.plus(gasPrice)
  DATA.gasUsed = DATA.gasUsed.plus(gasUsed)
  DATA.fee = DATA.fee.plus(fee)
}

function help (msg) {
  if (msg) console.error(`ERROR: ${msg}`)
  const myName = process.argv[1].split('/').pop()
  console.log('')
  console.log(`Usage:`)
  console.log(`node ${myName} [fromBlock] [toBlock]`)
  console.log(`Example: node ${myName} 100 200`)
  console.log('')
  process.exit(0)
}

function printObj (obj) {
  let o = Object.assign({}, obj)
  for (let p in o) {
    o[p] = o[p].toString(10)
  }
  console.log(o)
}