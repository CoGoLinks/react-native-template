import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Icon, TouchableOpacity, Picker } from '@/components';
import { getProvinceListUrl, getCityListUrl, getDistrictListUrl } from '@/services/address';

/**
 * TODO回写的值
 * @param {*} param0
 * @returns
 */

const SelectAddressCell = ({ item: address = {}, onPress = () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [provinceList, setProvinceList] = useState([]);

  const [addressList, setAddressList] = useState([]);
  const [pickerAddressValues, setPickerAddressValues] = useState([]);

  useEffect(() => {
    requestProvinceList();
  }, [requestProvinceList]);

  useEffect(() => {
    if (provinceList && provinceList?.length > 0) {
      requestAddressAction();
    }
  }, [provinceList, pickerAddressValues, requestAddressAction, address]);

  useEffect(() => {
    // 912, 928, 930
    if (provinceList && provinceList?.length > 0) {
      initValues();
    }
  }, [provinceList, address, initValues]);

  const isHasLocation = useMemo(() => {
    if (address?.value?.province && address?.value?.city) {
      return true;
    }
    return false;
  }, [address?.value?.city, address?.value?.province]);

  /**
   * 初始化省数据
   */
  const initValues = useCallback(async () => {
    const {
      provinceCode = undefined,
      cityCode = undefined,
      regionCode = undefined,
    } = address?.value || {};
    const _cityList = await getCityList(provinceCode);

    // 根据市id请求区列表
    const _districtList = await getDistrictList(cityCode);

    for (let index = 0; index < _cityList?.length; index++) {
      const _cityItem = _cityList[index];
      if (_cityItem.value === Number(cityCode)) {
        if (_districtList?.length > 0) {
          _cityItem.children = _districtList || [];
        }
      }
    }
    // 先把市放入区内
    for (let index = 0; index < provinceList?.length; index++) {
      const _provinceItem = provinceList[index];
      if (_provinceItem.value === Number(provinceCode)) {
        _provinceItem.children = _cityList || [];
        break;
      }
    }
    setAddressList([...provinceList]);

    const initData = [];
    if (provinceCode) {
      initData.push(Number(provinceCode));
    }
    if (cityCode) {
      initData.push(Number(cityCode));
    }
    if (regionCode) {
      initData.push(Number(regionCode));
    }
    setPickerAddressValues(initData);
  }, [address?.value, getCityList, getDistrictList, provinceList]);

  const requestAddressAction = useCallback(async () => {
    const [provinceCode = undefined, cityCode = undefined, districtCode = undefined] =
      pickerAddressValues || [];
    // 第三个选项如果有值， 不进行刷新 说明是区在活动
    if (districtCode) {
      return;
    }
    // 市动了 第三个区肯定没有值
    if (provinceCode && cityCode) {
      // 找到这个动了的省
      const provinceItem = provinceList.find((_provinceItem) => {
        return _provinceItem.value === provinceCode;
      });
      // 找到市
      const cityItem = provinceItem?.children?.find((_cityItem) => {
        return _cityItem?.value === cityCode;
      });
      if (cityItem?.hasOwnProperty('children')) {
        return;
      }
    }
    // 省动
    if (provinceCode && !cityCode) {
      // 找到这个动了的省
      const provinceItem = provinceList.find((_provinceItem) => {
        return _provinceItem?.value === provinceCode;
      });
      if (provinceItem?.hasOwnProperty('children')) {
        return;
      }
    }
    setLoading(true);
    // 获取省的第一条
    const [province = {}] = provinceList || [];
    const provinceAreaId = provinceCode ? provinceCode : province.value || '';

    // 根据省id请求市列表
    const _cityList = await getCityList(provinceAreaId);

    const [city = {}] = _cityList || [];
    const cityAreaId = cityCode ? cityCode : city.value || '';
    // 根据市id请求区列表
    const _districtList = await getDistrictList(cityAreaId);

    // 找到这个动了的省
    const provinceItem = provinceList.find((_provinceItem) => {
      return _provinceItem.value === provinceCode;
    });

    for (let index = 0; index < _cityList?.length; index++) {
      const _cityItem = _cityList[index];
      if (_cityItem.value === cityAreaId) {
        if (_districtList?.length > 0) {
          _cityItem.children = _districtList || [];
        }
      } else {
        // 找到市
        const cityItem = provinceItem?.children?.find((item) => {
          return item.value === _cityItem.value;
        });
        if (cityItem?.children) {
          _cityItem.children = cityItem?.children || [];
        }
      }
    }
    // 先把市放入区内
    for (let index = 0; index < provinceList?.length; index++) {
      const _provinceItem = provinceList[index];
      if (_provinceItem.value === provinceAreaId) {
        _provinceItem.children = _cityList || [];
        break;
      }
    }
    setAddressList([...provinceList]);
    setLoading(false);
  }, [getCityList, getDistrictList, pickerAddressValues, provinceList]);
  /**
   * 初始化省数据
   */
  const requestProvinceList = useCallback(async () => {
    const _provinceList = await getProvinceList();
    setProvinceList(_provinceList);
  }, [getProvinceList]);

  /**
   * 请求省数据
   */
  const getProvinceList = useCallback(async () => {
    try {
      const provinceRes = await getProvinceListUrl();
      const _provinceList = provinceRes?.data || [];
      return _provinceList.map((item) => {
        return {
          value: item?.areaId ?? '',
          label: item?.areaNm ?? '',
          ...item,
        };
      });
    } catch (error) {}
  }, []);
  /**
   * 请求市数据
   */
  const getCityList = useCallback(async (provinceCode = '') => {
    if (provinceCode) {
      try {
        const cityRes = await getCityListUrl(provinceCode);
        const _cityList = cityRes?.data || [];
        return _cityList.map((item) => {
          return {
            value: item?.areaId ?? '',
            label: item?.areaNm ?? '',
            ...item,
          };
        });
      } catch (error) {}
    }
  }, []);
  /**
   * 请求区数据
   */
  const getDistrictList = useCallback(async (cityCode = '') => {
    if (cityCode) {
      try {
        const districtRes = await getDistrictListUrl(cityCode);
        const _districtList = districtRes?.data || [];
        return _districtList.map((item) => {
          return {
            value: item?.areaId ?? '',
            label: item?.areaNm ?? '',
            ...item,
          };
        });
      } catch (error) {}
    }
  }, []);

  return (
    <View
      style={styles.cellItem}
      className=" flex-1 justify-center h-[88rpx] bg-c-w pl-[32rpx] pr-[32rpx]"
    >
      <View className="flex-row">
        <Text style={styles.nameText}>{address?.label || ''}</Text>
        <TouchableOpacity className="flex-1 flex-row" onPress={() => setVisible(true)}>
          {isHasLocation ? (
            <Text className="flex-1" style={styles.nameText}>
              {[address?.value?.province, address?.value?.city, address?.value?.region].join(' ') ||
                ''}
            </Text>
          ) : (
            <Text className="flex-1" style={styles.placeholderText}>
              {address?.placeholder || ''}
            </Text>
          )}
          <Icon name="right" size={36} color="#BCBCBD" />
        </TouchableOpacity>
      </View>
      <Picker
        loading={loading}
        data={addressList}
        cols={addressList?.length || 0}
        onChange={(value) => {
          setPickerAddressValues(value);
        }}
        onPickerChange={(value) => {
          setPickerAddressValues(value);
        }}
        onDismiss={() => {
          setVisible(false);
        }}
        visible={visible}
        value={pickerAddressValues}
        onOk={(value, extend) => {
          setVisible(false);
          const { items = [] } = extend || {};
          onPress(items);
        }}
      />
    </View>
  );
};

const styles = {
  nameText: {
    fontWeight: 400,
    fontSize: '28rpx',
    color: '#323233',
    minWidth: '112rpx',
    marginRight: '32rpx',
  },
  placeholderText: {
    fontWeight: 400,
    fontSize: '28rpx',
    color: '#B8B8BB',
  },
};

export default SelectAddressCell;
