import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Input, message } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from '../index.less';

const stateToProps = ({ loading, specialGroup }) => ({
  loading,
  IfShowNumModal: specialGroup.IfShowNumModal,
  specialMemberList: specialGroup.specialMemberList,
  specialMemberListTotal: specialGroup.specialMemberListTotal,
  specialMemberPageInfo: specialGroup.specialMemberPageInfo,
});

function ChooseNumModal(props) {
  // 选择的会员条目
  const [selectItem, setSelectItem] = useState([]);
  // 搜索框的搜索值
  // const [searchValue, setSearchValue] = useState('');

  const {
    IfShowNumModal,
    hiddenNumModal,
    specialMemberList,
    specialMemberListTotal,
    changePageInfo,
    specialMemberPageInfo,
    clearSearchValue,
    dispatch,
    serachByNum,
    changeSearchValue,
    searchValue,
    loading,
    visitedItemId,
    getExpandList,
    visitedItemMemberType,
    updateTargetSegmentMember,
  } = props;

  const columns = [
    {
      title: formatMessage({ id: 'specialGroup.number' }, '号码'),
      dataIndex: 'common_id',
      render: text => <a>{text}</a>,
    },
    // {
    //   title: '',
    //   dataIndex: 'subsId',
    //   render: text => <a style={{ display: 'none' }}>{text}</a>,
    // },
    {
      title:  formatMessage({ id: 'specialGroup.name' }, '名称'),
      dataIndex: 'common_name',
    },
  ];

  const rowSelection = {
    // 保存当前点击项
    onChange: (_, selectedRows) => {
      setSelectItem(selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  // 点击确认按钮
  async function handleOk() {
    const subsIdArr = [];
    selectItem.forEach(item => {
      subsIdArr.push(item.common_id);
    });
    dispatch({
      type: 'specialGroup/batchInsertSegMember',
      payload: {
        segmentId: visitedItemId,
        subsId: subsIdArr.join(','),
      },
    }).then(res => {
      if(res && res.topCont && res.topCont.resultCode === 0) {
          // 重新获取数据
        getExpandList(visitedItemId, visitedItemMemberType, { pageNum: 1, pageSize: specialMemberPageInfo.pageSize });
        updateTargetSegmentMember(visitedItemId, visitedItemMemberType);
        // 关闭弹窗
        hiddenNumModal();
      } else {
        message.error(res && res.topCont && res.topCont.remark);
      }
    });
  }

  // 重置分页信息
  useEffect(() => {
    return () => {
      dispatch({
        type: 'specialGroup/changeMemberPageInfo',
        payload: {
          pageNum: 1,
          pageSize: 5,
        },
      });
    };
  }, []);

  return (
    <Modal
      style={{ width: 600, height: 700 }}
      title={formatMessage({ id: 'specialGroup.chooseMember' }, '选择成员')}
      visible={IfShowNumModal}
      onOk={handleOk}
      onCancel={hiddenNumModal}
      className={styles.numWrapper}
      footer={
        <React.Fragment>
          <Button type="primary" size="small" onClick={handleOk}>
          {formatMessage({ id: 'common.btn.confirm' }, '确定')}
          </Button>
          <Button size="small" onClick={hiddenNumModal}>
          {formatMessage({ id: 'common.btn.cancel' }, '取消')}
          </Button>
        </React.Fragment>
      }
    >
      <header className={styles.numHeader}>
        <span>{formatMessage({ id: 'specialGroup.name' }, '名称')}：</span>
        <Input
          className={styles.numHeaderInput}
          // min={1}
          size="small"
          value={searchValue}
          onChange={changeSearchValue}
        />
        <Button
          type="primary"
          size="small"
          className={styles.numHeaderSearch}
          onClick={() => serachByNum(searchValue)}
        >
          {formatMessage({ id: 'common.btn.search' }, '查询')}
        </Button>
        <Button size="small" className={styles.numHeaderRestore} onClick={clearSearchValue}>
          {formatMessage({ id: 'common.btn.reset' }, '重置')}
        </Button>
      </header>
      <Table
        loading={loading.effects['specialGroup/qrySubsBasicInfo']}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={specialMemberList}
        rowKey={record => record.common_id}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          size: 'small',
          total: specialMemberListTotal,
          onChange: changePageInfo,
          onShowSizeChange: changePageInfo,
          defaultPageSize: 5,
          pageSizeOptions: ['5', '10', '20', '30'],
          current: specialMemberPageInfo.pageNum,
        }}
      />
    </Modal>
  );
}

export default connect(stateToProps)(ChooseNumModal);
