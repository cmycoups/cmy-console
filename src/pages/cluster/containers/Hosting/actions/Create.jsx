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

import { ModalAction } from 'containers/Action';
import { merge } from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { rootStore } from 'stores';
import { safeBtoa } from 'utils/base64';
import FORM_TEMPLATES from 'utils/form.templates';
import styles from './index.less';

// eslint-disable-next-line no-unused-vars

class Create extends ModalAction {
  static id = 'add-provider';

  static title = t('Add');

  get name() {
    return t('Add');
  }

  get module() {
    return 'cloudproviders';
  }

  get labelCol() {
    return { span: 4 };
  }

  static get modalSize() {
    return 'middle';
  }

  init() {
    this.store = rootStore.cloudProviderStore;
    this.regionStore = rootStore.regionStore;
    this.projectStore = rootStore.projectStore;

    this.getProject();

    this.getRegion();
  }

  static policy = 'cloudproviders:edit';

  static allowed = () => Promise.resolve(true);

  get defaultValue() {
    return {
      type: 'kubeadm',
      sshType: 'privateKey',
    };
  }

  get projectOptions() {
    const options = (this.projectStore.list.data || []).map((item) => ({
      value: item.name,
      label: item.name,
    }));
    return options;
  }

  getProject() {
    this.projectStore.fetchList({ limit: -1 });
  }

  get tips() {
    return t(
      'Adding a provider will batch import the clusters running in the provider into the platform'
    );
  }

  async getRegion() {
    await this.regionStore.fetchList();
  }

  getRegionOptions() {
    const data = toJS(this.regionStore.list.data);

    return (data || []).map(({ name }) => ({
      value: name,
      label: name,
    }));
  }

  get formItems() {
    const { sshType } = this.state;
    const isPassword = sshType === 'password';

    return [
      {
        name: 'name',
        label: t('Name'),
        type: 'input-name',
        placeholder: t('Please input name'),
        required: true,
      },
      {
        name: 'description',
        label: t('Description'),
        type: 'textarea',
        maxLength: 256,
      },
      {
        name: 'type',
        label: t('Provider Type'),
        type: 'radio',
        optionType: 'button',
        buttonStyle: 'outline',
        required: true,
        options: [
          {
            label: t('kubeadm'),
            value: 'kubeadm',
          },
        ],
      },
      {
        name: 'region',
        label: t('Region'),
        type: 'select-input',
        placeholder: t('Please input region which cluster and node belong'),
        required: true,
        options: this.getRegionOptions(),
      },
      {
        name: 'project',
        label: t('Project'),
        type: 'select',
        options: this.projectOptions,
        required: true,
      },
      {
        name: 'sshType',
        label: t('SSH'),
        type: 'radio',
        optionType: 'button',
        buttonStyle: 'outline',
        required: true,
        options: [
          {
            label: t('PrivateKey'),
            value: 'privateKey',
          },
          {
            label: t('Password'),
            value: 'password',
          },
        ],
      },
      {
        name: 'user',
        label: t('User'),
        type: 'input',
        placeholder: t('Please input node user'),
        required: true,
      },
      {
        name: 'password',
        label: t('Password'),
        type: 'input-password',
        placeholder: t('Please input node password'),
        required: true,
        hidden: !isPassword,
      },
      {
        name: 'privateKey',
        label: t('PrivateKey'),
        type: 'textarea',
        placeholder: t('Please input node privateKey'),
        required: true,
        hidden: isPassword,
      },
      {
        name: 'clusterName',
        label: t('Cluster Name'),
        type: 'input-name',
        placeholder: t('Please input cluster name'),
        required: true,
        tip: t(
          'The cluster name is used as the display name of this platform and cannot be repeated with other cluster names.'
        ),
      },
      {
        name: 'kubeConfig',
        label: t('KubeConfig'),
        type: 'yaml-input',
        required: true,
        wrapperCol: { span: 24 },
        className: styles.kubeconfig,
      },
    ];
  }

  onSubmit = (values) => {
    const {
      name,
      description,
      type,
      region,
      apiEndpoint,
      user,
      password,
      privateKey,
      clusterName,
      kubeConfig,
      project,
    } = values;

    const data = {
      metadata: {
        name,
        annotations: {
          'kubeclipper.io/description': description,
        },
        labels: {
          'kubeclipper.io/project': project,
        },
      },
      type,
      region,
      config: {
        apiEndpoint,
        clusterName,
        kubeConfig: safeBtoa(kubeConfig),
      },
      ssh: {
        user,
        password: safeBtoa(password),
        port: 22,
        privateKey: safeBtoa(privateKey),
      },
    };

    const formTemplate = merge(FORM_TEMPLATES[this.module](), data);

    return this.store.create(formTemplate);
  };
}

export default observer(Create);
