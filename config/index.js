import dev from './config.dev';
import test from './config.test';
import pro from './config.pro';

// 当前环境
const env = 2;
const config = [dev, test, pro][env];

export default config;
