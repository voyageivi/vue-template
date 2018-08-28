/* eslint-disable */ 
import {
  createInstance
} from './axiosConfig'
import config from '../config'
import {
  checkResponse
} from './common'
export const inst = createInstance(config.API_BASE_URL)

export function test (obj) {
  return inst.post('/PalmplayManager/pageApi/ad/addOrUpdate', {}).then((res) => {
    return checkResponse(res)
  })
};
