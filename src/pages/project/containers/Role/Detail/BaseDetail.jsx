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
import React, { useEffect } from 'react';
import { Card, Empty } from 'antd';
import { groupBy, get } from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import AuthorityList from 'pages/access/containers/Role/Detail/AuthorityList';
import { useRootStore } from 'stores';
import styles from './index.less';

function BaseDetail() {
  const { projectRoleStore: store } = useRootStore();

  useEffect(() => {
    store.fetchRoleTemplates({ limit: -1 });
  }, []);

  const roleTemplates = toJS(store.roleTemplates.data);

  const templates = groupBy(
    roleTemplates.filter(
      (rt) =>
        get(rt, 'annotations["kubeclipper.io/module"]') &&
        store.detail.roleTemplates.includes(rt.name)
    ),
    'annotations["kubeclipper.io/module"]'
  );

  return (
    <Card
      title={t('Authorization List')}
      bordered={false}
      className={styles.card}
      loading={store.isLoading}
    >
      {Object.keys(templates).length <= 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t('No Authorization')}
        />
      )}

      <AuthorityList templates={templates} />
    </Card>
  );
}

export default observer(BaseDetail);
