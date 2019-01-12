import { cookie } from './cookie'
import { dom } from './dom'
import { func } from './func'
import { log } from './log'
import { network } from './network'
import { object } from './object'

import { deepFreeze } from 'utils/object/deepFreeze'

/**
 * 工具包
 */
const utils = {
  cookie,
  dom,
  func,
  log,
  network,
  object,
}

deepFreeze(utils)

export {
  utils,
}
