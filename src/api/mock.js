import service from './index'

export const getBatchSetList = (params) => {
  return service.get(service.api_plus+'/elementField/getBatchSetList',params);
};