// 高德地图相关api,调用前需要先引入高德的sdk
// https://lbs.amap.com/api

/**
 * 高德IP定位
 * @param {*} tagId 容器的id 必须
 * @return { areaCode, center } 城市code 城市中心的经纬度
 */
export function locationByIP(tagId) {
  const map = new AMap.Map(tagId);
  return {
    areaCode: map.getAdcode(),
    center: map.getCenter()
  };
}

/**
 * 高德精确定位
 * @param {*} config
 * https://lbs.amap.com/api/javascript-api/reference/location#m_AMap.Geolocation
 */
export function locationGaodeExact(config = {}) {
  return new Promise((res, rej) => {
    AMap.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 2000, //超过2秒后停止定位，默认：5s
        buttonPosition: 'RB', //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        ...config
      });
      geolocation.getCurrentPosition((status, result) => {
        if (status == 'complete') {
          onComplete(result);
        } else {
          onError(result);
        }
      });
    });

    //解析定位结果
    function onComplete(data) {
      const {
        position: { lng, lat },
        formattedAddress,
        addressComponent: { province, city, district, adcode }
      } = data;
      const result = {
        longitude: lng,
        latitude: lat,
        province,
        city,
        district,
        address: formattedAddress,
        adcode // 区县code
      };
      console.log('location success', result);

      res(result);
    }
    //解析定位错误信息
    function onError(error) {
      console.log('location error', error);
      return rej(error);
    }

    // res({
    //   longitude: '120.023763,',
    //   latitude: '30.289903',
    //   city: '杭州市',
    //   district: '拱墅区',
    //   adcode: '330105'
    // })
  });
}

/**
 * 地图初始化
 * @param {*} longitude 经度
 * @param {*} latitude 纬度
 * @param {*} id 容器ID
 */
export function mapInit(longitude, latitude, id) {
  const coordinate = [longitude, latitude];

  // 创建地图实例
  const map = new AMap.Map(id, {
    zoom: 14,
    center: coordinate,
    resizeEnable: true
  });

  const startIcon = new AMap.Icon({
    // 图标尺寸
    size: new AMap.Size(30, 30),
    // 图标的取图地址
    image: 'https://img.alicdn.com/tfs/TB1zjA2aQcx_u4jSZFlXXXnUFXa-80-90.png',
    // 图标所用图片大小
    imageSize: new AMap.Size(30, 30)
  });

  const marker = new AMap.Marker({
    icon: startIcon,
    position: coordinate
  });
  map.add(marker); //添加到地图
}

/**
 * 地址逆编码
 * @param {*} areaCode 经纬度（字符串或数组）
 * @param {*} config 配置 参考  https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#m_AMap.Geocoder
 */
export function regeoCode(areaCode, config = {}) {
  return new Promise((res, rej) => {
    AMap.plugin('AMap.Geocoder', () => {
      const geocoder = new AMap.Geocoder(config);

      geocoder.getAddress(areaCode, (status, result) => {
        if (status === 'complete' && result.regeocode) {
          res(result);
        } else {
          rej('根据经纬度查询地址失败');
        }
      });
    });
  });
}
