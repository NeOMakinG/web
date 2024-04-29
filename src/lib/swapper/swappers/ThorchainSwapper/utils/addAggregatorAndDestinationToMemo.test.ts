import { CHAIN_NAMESPACE } from '@shapeshiftoss/caip'
import { describe, expect, it } from 'vitest'

import { addAggregatorAndDestinationToMemo } from './addAggregatorAndDestinationToMemo'
import { MEMO_PART_DELIMITER } from './constants'

const RECEIVE_ADDRESS = '0x32DBc9Cf9E8FbCebE1e0a2ecF05Ed86Ca3096Cb6'
const AGGREGATOR_ADDRESS = '0xd31f7e39afECEc4855fecc51b693F9A0Cec49fd2'
const FINAL_ASSET_ADDRESS = '0x8a65ac0E23F31979db06Ec62Af62b132a6dF4741'
const AGGREGATOR_TWO_LAST_CHARS = 'd2'
const FINAL_ASSET_TWO_LAST_CHARS = '41'

describe('addAggregatorAndDestinationToMemo', () => {
  it('should add aggregator address, destination address and minAmountOut correctly', () => {
    const minAmountOut = '9508759019'
    const affiliateBps = '100'
    const expectedL1AmountOut = '42' // we don't care about this for the purpose of tests
    const quotedMemo = `=:ETH.ETH:${RECEIVE_ADDRESS}:${expectedL1AmountOut}:ss:${affiliateBps}:${AGGREGATOR_ADDRESS}:${FINAL_ASSET_ADDRESS}:10`

    const slippageBps = 100 // 1%

    const modifiedMemo = addAggregatorAndDestinationToMemo({
      quotedMemo,
      aggregator: AGGREGATOR_ADDRESS,
      finalAssetAddress: FINAL_ASSET_ADDRESS,
      minAmountOut,
      slippageBps,
      finalAssetPrecision: 9,
      chainNamespace: CHAIN_NAMESPACE.Evm,
    })

    expect(modifiedMemo).toBe(
      `=${MEMO_PART_DELIMITER}e${MEMO_PART_DELIMITER}${RECEIVE_ADDRESS}${MEMO_PART_DELIMITER}${expectedL1AmountOut}${MEMO_PART_DELIMITER}ss${MEMO_PART_DELIMITER}${slippageBps}${MEMO_PART_DELIMITER}${AGGREGATOR_TWO_LAST_CHARS}${MEMO_PART_DELIMITER}${FINAL_ASSET_TWO_LAST_CHARS}${MEMO_PART_DELIMITER}941367103`,
    )
  })

  it('should add aggregator address, destination address and minAmountOut correctly with a bigger precision', () => {
    const minAmountOut = '2083854765519275828179229'
    const affiliateBps = '100'
    const expectedL1AmountOut = '42' // we don't care about this for the purpose of tests
    const quotedMemo = `=:ETH.ETH:${RECEIVE_ADDRESS}:${expectedL1AmountOut}:ss:${affiliateBps}:${AGGREGATOR_ADDRESS}:${FINAL_ASSET_ADDRESS}:10`

    const slippageBps = 100 // 1%

    const modifiedMemo = addAggregatorAndDestinationToMemo({
      quotedMemo,
      aggregator: AGGREGATOR_ADDRESS,
      finalAssetAddress: FINAL_ASSET_ADDRESS,
      minAmountOut,
      slippageBps,
      finalAssetPrecision: 18,
      chainNamespace: CHAIN_NAMESPACE.Evm,
    })

    expect(modifiedMemo).toBe(
      `=${MEMO_PART_DELIMITER}e${MEMO_PART_DELIMITER}${RECEIVE_ADDRESS}${MEMO_PART_DELIMITER}${expectedL1AmountOut}${MEMO_PART_DELIMITER}ss${MEMO_PART_DELIMITER}${affiliateBps}${MEMO_PART_DELIMITER}${AGGREGATOR_TWO_LAST_CHARS}${MEMO_PART_DELIMITER}${FINAL_ASSET_TWO_LAST_CHARS}${MEMO_PART_DELIMITER}206301621786412`,
    )
  })
})
