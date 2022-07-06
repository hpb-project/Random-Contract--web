import { getAction,postAction} from '@/api/manage'


const queryNodeJson = (params)=>getAction("/json/node.json",params);

export {
  queryNodeJson,
}



