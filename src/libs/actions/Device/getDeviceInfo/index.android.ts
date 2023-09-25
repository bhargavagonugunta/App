import getBaseInfo from './getBaseInfo';
import getOSAndName from './getOSAndName/index.native';
import {GetDeviceInfo} from './types';

const getDeviceInfo: GetDeviceInfo = () => {
    return {
        ...getBaseInfo(),
        ...getOSAndName(),
        os: 'Android',
    };
}

export default getDeviceInfo;
