import { implement } from '@orpc/server'
import {
  listWarframeContract,
  findWarframeContract,
  createWarframeContract,
  listWarframeHandler,
  findWarframeHandler,
  createWarframeHandler
} from './api' // Updated import path to point to the new index.ts

export const contract = {
  warframe: {
    list: listWarframeContract,
    find: findWarframeContract,
    create: createWarframeContract
  }
}

const os = implement(contract)

export const router = os.router({
  warframe: {
    list: os.warframe.list.handler(listWarframeHandler),
    find: os.warframe.find.handler(findWarframeHandler),
    create: os.warframe.create.handler(createWarframeHandler)
  }
})
