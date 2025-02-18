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
import getTitle from '../../../support/common';

before(() => {
  cy.login();
  cy.checkClusterExist();
});

describe('集群详情', () => {
  const testUrl = '/cluster';

  beforeEach(() => {
    cy.login(testUrl);
    cy.goToDetail(1);
  });

  // 查看集群详情
  it('集群管理-集群详情-详情-1', () => {
    cy.clickByDetailTabs('BaseDetail');

    cy.get('.ant-descriptions-view').should('exist');
    cy.get('.ant-tabs-content h3').should('contain', getTitle('Base Info'));
    cy.get('.ant-tabs-content h3').should('contain', getTitle('Network Info'));
  });

  // 查看集群存储
  it.only('集群管理-集群详情-存储详情-1', () => {
    cy.clickByDetailTabs('Storage');

    cy.get('.ant-tabs-content h3').should('contain', 'nfs-provisioner');
  });

  // 查看节点列表
  it.skip('集群管理-集群-集群详情-节点列表-1', () => {});

  // 添加节点
  it('集群管理-集群-集群详情-节点列表-2', () => {
    cy.clickByDetailTabs('Nodes List');

    cy.get('.ant-table-body')
      .find('.ant-table-row')
      .its('length')
      .as('rowLength');

    cy.clickHeaderButton(0, 200);
    cy.formMultiTransfer('nodes', 0);
    cy.clickConfirm();

    cy.log('@rowLength');

    cy.get('@rowLength').then((rowLength) => {
      cy.log(rowLength);
      cy.get('.ant-table-body .ant-table-row').should(
        'have.lengthOf.gt',
        rowLength
      );
    });
  });

  // 查看操作日志
  it('集群管理-集群-集群详情-操作日志-1', () => {
    cy.clickByDetailTabs('Operation Log');

    cy.clickActionButtonByTitle('ViewLog');
    cy.get('.ant-modal-body').should('exist');
  });

  // 查看集群备份
  it('集群管理-集群-集群详情-备份-1', () => {
    cy.clickByDetailTabs('BackUp');

    cy.clickActionButtonByTitle('Edit');
    cy.inputText('description', 'description');
    cy.clickConfirm();
    cy.checkTableColVal(2, 'description');

    cy.clickActionInMore({
      title: 'Restore',
    });
    cy.clickConfirmActionSubmitButton();
    cy.wait(2000).waitStatusSuccess();

    cy.clickActionInMore({
      title: 'Delete',
    });
    cy.clickConfirmActionSubmitButton();
    cy.wait(2000).waitStatusSuccess();
  });
});
