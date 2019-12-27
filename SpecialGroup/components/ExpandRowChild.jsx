import React from 'react';
import { Card, Button, Table, Popconfirm } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import ExportModal from './ExportModal';
import styles from '../index.less';

const stateToProps = ({ loading, specialGroup }) => ({
  loading,
  specialExpandListTotal: specialGroup.specialExpandListTotal,
  specialExpandPageInfo: specialGroup.specialExpandPageInfo,
  ifShowExportModal: specialGroup.ifShowExportModal,
  segmentDetailLoading:
    loading.effects['specialGroup/selectSegmentMembers'] ||
    loading.effects['specialGroup/selectSegmentMemberCount'] ||
    loading.effects['specialGroup/updateSegmentMember'],
});

// 子扩展模块
function ExpandedChild(props) {
  const {
    getChildColums,
    specialExpandList,
    showNumModal,
    // loading,
    specialExpandPageInfo,
    specialExpandListTotal,
    deleteAllItem,
    dispatch,
    getExpandList,
    visitedItemId,
    showImportModal,
    ifShowExportModal,
    segmentDetailLoading,
    visitedItemMemberType,
    itemData,
  } = props;

  // 修改扩展成员列表分页信息
  function changeExpandPageInfo(pageNum, pageSize) {
    dispatch({
      type: 'specialGroup/changeExpandPageInfo',
      payload: {
        pageNum,
        pageSize,
      },
    });
    getExpandList(visitedItemId, visitedItemMemberType, { pageNum, pageSize });
  }

  // 显示导出模块
  function showExportModal() {
    dispatch({
      type: 'specialGroup/changeExportModalState',
      payload: true,
    });
  }
  // 关闭导出模块
  function closeModal() {
    dispatch({
      type: 'specialGroup/changeExportModalState',
      payload: false,
    });
  }
  // console.log('itemData',itemData)
  return (
    <Card
      className={styles.expandedChildWrapper}
      // title="分群成员"
      // extra={
      //   <div className={styles.cardHeader}>
      //     <Button size="small" icon="plus" type="primary" onClick={showNumModal}>
      //       新增成员
      //     </Button>
      //     <Popconfirm
      //       title="是否确定删除全部"
      //       onConfirm={deleteAllItem}
      //       cancelText="取消"
      //       okText="确定"
      //     >
      //       <Button size="small" type="primary">
      //         删除所有成员
      //       </Button>
      //     </Popconfirm>
      //     <Button size="small" type="primary" onClick={showExportModal}>
      //       导出
      //     </Button>
      //     <Button size="small" type="primary" onClick={showImportModal}>
      //       导入
      //     </Button>
      //   </div>
      // }
    >
      <Table
        loading={segmentDetailLoading}
        rowKey={record => record.common_id}
        className={styles.childList}
        columns={getChildColums()}
        dataSource={specialExpandList}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          size: 'small',
          total: specialExpandListTotal,
          onChange: changeExpandPageInfo,
          onShowSizeChange: changeExpandPageInfo,
          defaultPageSize: 5,
          pageSizeOptions: ['5', '10', '20', '30'],
          current: specialExpandPageInfo.pageNum,
        }}
      />
      <div className={styles.memberOprBtnGroup}>
        {itemData.memberType !== '1200' && (
          <Button size="small" onClick={showNumModal}>
            {formatMessage({ id: 'specialGroup.createMember' }, '新增成员')}
          </Button>
        )}
        <Popconfirm
          title={formatMessage({ id: 'specialGroup.ifConfirmDeleteAll' }, '是否确定删除全部')}
          onConfirm={deleteAllItem}
          cancelText={formatMessage({ id: 'common.btn.cancel' }, '取消')}
          okText={formatMessage({ id: 'common.btn.confirm' }, '确定')}
        >
          <Button size="small">
            {formatMessage({ id: 'specialGroup.deleteAllMember' }, '删除所有成员')}
          </Button>
        </Popconfirm>
        <Button size="small" onClick={showExportModal}>
          {formatMessage({ id: 'specialGroup.export' }, '导出')}
        </Button>
        <Button size="small" onClick={showImportModal}>
          {formatMessage({ id: 'specialGroup.import' }, '导入')}
        </Button>
      </div>
      <ExportModal closeModal={closeModal} ifShowExportModal={ifShowExportModal} />
    </Card>
  );
}

export default connect(stateToProps)(ExpandedChild);
