/*
 * Copyright 2021 KubeClipper Authors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import React, { useEffect, useState } from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './index.less';

export default function More(props) {
  const { value, onChange } = props;

  const [moreValue, setMoreValue] = useState(value);

  useEffect(() => {
    onChange(moreValue);
  }, [moreValue]);

  const onChangeValue = () => {
    setMoreValue(!moreValue);
  };

  if (moreValue) {
    return (
      <Button type="link" className={styles.btn} onClick={onChangeValue}>
        {t('Hide Advanced Options')}
        <CaretUpOutlined />
      </Button>
    );
  }
  return (
    <Button type="link" className={styles.btn} onClick={onChangeValue}>
      {t('Expand Advanced Options')}
      <CaretDownOutlined />
    </Button>
  );
}
