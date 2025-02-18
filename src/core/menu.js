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
import React from 'react';
import {
  UserOutlined,
  NodeCollapseOutlined,
  ClusterOutlined,
} from '@ant-design/icons';

const renderMenu = (t) => {
  if (!t) {
    return [];
  }
  const menu = [
    {
      name: t('Cluster Management'),
      key: 'cluster-management',
      icon: <ClusterOutlined />,
      children: [
        {
          path: '/cluster',
          name: t('Cluster'),
          key: 'cluster',
          level: 1,
          module: 'clusters',
          children: [
            {
              path: '/cluster/create',
              name: t('Create Cluster'),
              key: 'cluster-create',
              level: 2,
              module: 'clusters',
            },
            {
              path: /^\/cluster\/.[^/]+$/,
              name: t('Cluster Detail'),
              key: 'cluster-detail',
              level: 2,
              module: 'clusters',
            },
            {
              path: /^\/cluster\/add-storage\/.[^/]+$/,
              name: t('Add Storage'),
              key: 'add-storage',
              level: 2,
              module: 'clusters',
            },
            {
              path: /^\/cluster\/add-plugin\/.[^/]+$/,
              name: t('Add Plugin'),
              key: 'add-plugin',
              level: 2,
              module: 'clusters',
            },
          ],
        },
        {
          path: '/cluster/backup-point',
          name: t('Backup Space'),
          key: 'backup-point',
          level: 1,
          module: 'backuppoints',
        },
        {
          path: '/cluster/template',
          name: t('Template Management'),
          key: 'template-management',
          level: 1,
          module: 'clusters',
          children: [
            {
              path: '/cluster/template/create',
              name: t('Create Template'),
              key: 'cluster-template-create',
              level: 2,
              module: 'clusters',
            },
            {
              path: /^\/cluster\/template\/edit\/.[^/]+$/,
              name: t('Edit Template'),
              key: 'cluster-template-edit',
              level: 2,
              module: 'clusters',
            },
            {
              path: /^\/cluster\/plugin-template\/create\/.[^/]+$/,
              name: t('Create Plugin Template'),
              key: 'plugin-template-create',
              level: 2,
              module: 'clusters',
            },
            {
              path: /^\/cluster\/plugin-template\/edit\/.[^/]+\/.[^/]+$/,
              name: t('Edit Plugin Template'),
              key: 'plugin-template-edit',
              level: 2,
              module: 'clusters',
            },
          ],
        },
        {
          path: '/cluster/registry',
          name: t('Registry'),
          key: '/cluster/registry',
          level: 1,
          module: 'registries',
        },
        {
          path: '/cluster/hosting',
          name: t('Cluster Hosting'),
          key: 'cloud-hosting',
          level: 1,
          module: 'cloudproviders',
          children: [
            {
              path: /^\/cluster\/hosting\/.[^/]+$/,
              name: t('Cluster Hosting Detail'),
              key: 'cluster-Hosting-detail',
              level: 2,
              module: 'cloudproviders',
            },
          ],
        },
      ],
    },
    {
      path: '/node',
      name: t('Node Info'),
      key: '/node',
      icon: <NodeCollapseOutlined />,
      level: 1,
      children: [
        {
          path: /^\/node\/.[^/]+$/,
          name: t('Node Detail'),
          key: 'node-detail',
          level: 2,
          module: 'nodes',
        },
      ],
    },
    {
      path: '/project',
      name: t('Project Setting'),
      key: '/project',
      icon: <UserOutlined />,
      children: [
        {
          path: '/project/user',
          name: t('Project Users'),
          key: '/project/user',
          level: 1,
          module: 'projectmembers',
          children: [
            {
              path: /^\/project\/user\/.[^/]+$/,
              name: t('Project User Detail'),
              key: 'project-detail',
              level: 2,
              module: 'projectmembers',
            },
          ],
        },
        {
          path: '/project/role',
          name: t('Project Roles'),
          key: '/project/role',
          level: 1,
          module: 'projectroles',
          children: [
            {
              path: /^\/project\/role\/[^/]+$/,
              name: t('Project Role Detail'),
              key: 'project-role-detail',
              level: 2,
              module: 'projectroles',
            },
          ],
        },
      ],
    },
  ];
  return menu;
};

export default renderMenu;
