import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import {
  Card,
  Pagination,
  Divider,
  ConfigProvider,
  Button,
  Input,
  Table,
  Icon,
  Popconfirm,
  message,
  Select,
  Form,
} from 'antd';
import { connect } from 'dva';
import ChooseNumModal from './components/ChooseNumModal';
import GroupDetailModal from './components/GroupDetail';
import ExpandRowChild from './components/ExpandRowChild';
import ImportModal from './components/ImportModal';
import CommonFilter from '@/components/CommonFilter';
import styles from './index.less';
const { Option } = Select;

const stateToProps = ({ specialGroup, loading }) => ({
  loading,
  IfShowNumModal: specialGroup.IfShowNumModal,
  IfShowGroupDetailModal: specialGroup.IfShowGroupDetailModal,
  ifShowImportModal: specialGroup.ifShowImportModal,
  specialGroupList: specialGroup.specialGroupList,
  specialGroupListTotal: specialGroup.specialGroupListTotal,
  specialListClickItem: specialGroup.specialListClickItem,
  specialMemberPageInfo: specialGroup.specialMemberPageInfo,
  specialExpandList: specialGroup.specialExpandList,
  specialExpandPageInfo: specialGroup.specialExpandPageInfo,
  specialGroupPageInfo: specialGroup.specialGroupPageInfo,
});

function GroupList(props) {
  const [expandArray, setExpandArray] = useState([]); // 自定义展开的数组
  // const [advancedFilterShow, setAdvancedFilterShow] = useState('none'); // 高级筛选展示与否
  const [visitedItemId, setVisitedItemId] = useState(''); // 当前访问项的ID
  const [searchValue, setSearchValue] = useState(''); // 分群列表的搜索值
  const [searchNumber, setSearchNumber] = useState(''); // 分群列表高级筛选的用户号码值
  const [numberSearchValue, setNumberSearchValue] = useState(''); // 用户弹窗的搜索值
  const [visitedItemMemberType, setVisitedItemMemberType] = useState(''); // 当前访问项的成员类型
  const {
    nodeKey: fold,
    dispatch,
    specialMemberPageInfo,
    loading,
    specialExpandList,
    specialGroupPageInfo,
    specialGroupListTotal,
    specialExpandPageInfo,
    ifShowImportModal,
    memberTypeList,
    form,
  } = props;
  const { getFieldDecorator } = form;

  const [memberType, setMemberType] = useState(''); // 选择的下拉框项
  const [segmentTypeList, setSegmentTypeList] = useState([]); // 分群类型列表

  useEffect(() => {
    dispatch({
      type: 'specialGroup/qryAttrValueByCode',
      payload: {
        attrSpecCode: 'MCC_SEGMENT_TYPE',
        language: 'zh',
      },
    }).then(res => {
      if (res && res.topCont && res.topCont.resultCode === 0) {
        setSegmentTypeList(res.svcCont.data);
      }
    });
  }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: 'specialGroup/qryAttrValueByCode',
  //     payload: {
  //       attrSpecCode: 'MCC_SEGMENT_TYPE',
  //       language: 'zh',
  //     },
  //   }).then(res => {
  //     if (res && res.topCont && res.topCont.resultCode === 0) {
  //       setSelectValue(res.svcCont.data);
  //     }
  //   });
  // }, []);

  // 获取分群列表数据
  useEffect(() => {
    // if (fold) {
      dispatch({
        type: 'specialGroup/querySegmentDetailInfo',
        payload: {
          fold,
          segmentName: '',
          segmentType: '',
          pageInfo: {
            pageNum: 1,
            pageSize: 5,
          },
        },
      });
    // }

    // componentWillUnMount
    return () => {
      dispatch({
        type: 'specialGroup/changeGroupPageInfo',
        payload: {
          pageNum: 1,
          pageSize: 5,
        },
      });
      dispatch({
        type: 'specialGroup/changeExpandPageInfo',
        payload: {
          pageNum: 1,
          pageSize: 5,
        },
      });
    };
  }, [fold]);

  // 获取分群列表数据
  function getSpecialListData(value, number, pageInfo) {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'specialGroup/querySegmentDetailInfo',
          payload: {
            fold,
            ...values,
            pageInfo: {
              pageNum: pageInfo.pageNum,
              pageSize: pageInfo.pageSize,
            },
          },
        });
      }
    });
  }

  // 分群列表分页操作
  function changePageInfo(pageNum, pageSize) {
    dispatch({
      type: 'specialGroup/changeGroupPageInfo',
      payload: {
        pageNum,
        pageSize,
      },
    });
    getSpecialListData(searchValue, searchNumber, { pageNum, pageSize });
  }

  // 保存当前点击项
  const saveListClickItem = item => {
    dispatch({
      type: 'specialGroup/saveGroupListClickItem',
      payload: item,
    });
  };

  // 显示分群信息弹窗
  function showGroupDetail(type) {
    dispatch({
      type: 'specialGroup/showGroupDetailModal',
      payload: type,
    });
  }

  // 高级筛选展示与否
  // function showAdvancedFilter() {
  //   if (advancedFilterShow === 'none') {
  //     setAdvancedFilterShow('block');
  //   } else {
  //     setAdvancedFilterShow('none');
  //     // 清空高级筛选
  //     setSearchNumber();
  //     setMemberType();
  //   }
  // }

  // 删除分群列表
  function deleteSpecialItem(record) {
    dispatch({
      type: 'specialGroup/deleteMccSegment',
      payload: {
        segmentid: record.id,
        segmentCode: '',
        segmentType: record.segmentType,
        fold: record.fold,
        createdate: record.createdate,
        createby: record.createby,
        updatedate: record.updatedate,
        updateby: record.updateby,
        lastrundate: '',
        runby: '',
        RUNBY_NAME: '',
        cleverSegScript: '',
        state: '',
        refreshTimeUnit: '',
        refreshInterval: '',
        name: record.segmentName,
        description: record.description,
        segmentcount: record.segmentcount,
      },
    }).then(res => {
      if (res && res.topCont && res.topCont.resultCode === 0) {
        // 重新获取数据
        getSpecialListData(searchValue, searchNumber, specialGroupPageInfo);
      } else if (res && res.topCont && res.topCont.remark) {
        if (res.topCont.remark === 'member') {
          message.error(formatMessage({ id: 'specialGroup.deleteGroupFailTipsForMember' }));
        } else if (res.topCont.remark === 'reference') {
          message.error(formatMessage({ id: 'specialGroup.deleteGroupFailTipsForReferences' }));
        } else {
          message.error(res && res.topCont && res.topCont.remark);
        }
      }
    });
  }

  function findSegmentTypeName(segmentType) {
    if (segmentTypeList) {
      const targetSegment = segmentTypeList.find(segmentTypeItem => {
        return segmentTypeItem.attrValueCode === String(segmentType);
      });
      return targetSegment ? targetSegment.attrValueName : '';
    }
    return '';
  }

  async function updateTargetSegmentMember(segmentId, itemMemberType) {
    await dispatch({
      type: 'specialGroup/selectSegmentMemberCount',
      payload: {
        segmentId,
        memberType: itemMemberType,
      },
      callback: async svcCont => {
        await dispatch({
          type: 'specialGroup/updateSegmentMember',
          payload: {
            segmentId,
            segmentCount: svcCont.data,
          },
        });
        getSpecialListData(searchValue, searchNumber, specialGroupPageInfo);
      },
    });
  }

  // --------- 分群成员扩展列表接口 -----------
  // 获取分群成员扩展列表数据
  const getExpandList = useCallback((id, itemMemberType, pageInfo = {}) => {
    dispatch({
      type: 'specialGroup/selectSegmentMembers',
      payload: {
        segmentId: id,
        memberType: itemMemberType,
        pageInfo: {
          pageNum: pageInfo.pageNum,
          pageSize: pageInfo.pageSize,
        },
      },
    });
  }, []);

  // 自定义展开触发点
  async function showExpandChildList(record) {
    // 获取点击元素的标签类型，如果是 A标签(分群名称，编辑，删除) 则不显示子列表
    // const ItemType = e.target.tagName.toString();
    const key = [];
    const { segmentid: itemId, memberType: itemMemberType } = record;
    // if(opr && opr === 'view') {
    // 清空当前
    dispatch({
      type: 'specialGroup/saveExpandList',
      payload: {
        svcCont: {
          data: [],
          pageInfo: {
            total: 0,
          },
        },
      },
    });
    saveListClickItem(record);
    if (visitedItemId != itemId) {
      key.push(record.segmentid); // 点击的每一行的key的值保存下来。
      setExpandArray(key);
      // 保存访问项的 ID 值
      await setVisitedItemId(itemId);
      await setVisitedItemMemberType(itemMemberType);
      // 获取扩展列表数据
      getExpandList(itemId, itemMemberType, specialExpandPageInfo);
      // 二次点击关闭子列表
    } else {
      key.splice(key.indexOf(record.segmentid), 1); // 再次点击的时候从数组删除上次存入的key值。
      setExpandArray([]);
      await setVisitedItemId(null);
    }
    // }
  }

  // 获取父列表的数据
  function getColums() {
    return [
      {
        title: formatMessage({ id: 'specialGroup.groupName' }),
        dataIndex: 'segmentName',
        key: 'segmentName',
        render: (text, record) => (
          <a
            onClick={() => {
              saveListClickItem(record);
              showGroupDetail('view');
            }}
          >
            {text}
          </a>
        ),
      },
      {
        title: formatMessage({ id: 'specialGroup.groupMemberCount' }),
        dataIndex: 'segmentcount',
        key: 'segmentcount',
      },
      {
        title: formatMessage({ id: 'specialGroup.groupType' }),
        dataIndex: 'segmentTypeName',
        key: 'segmentTypeName',
        render: (_, record) =>
          record && record.segmentType ? findSegmentTypeName(record.segmentType) : '',
      },
      {
        title: formatMessage({ id: 'specialGroup.memberType' }),
        dataIndex: 'memberTypeName',
      },
      {
        title: formatMessage({ id: 'specialGroup.updateTime' }),
        dataIndex: 'createdate',
        key: 'createdate',
        width: 200,
      },
      {
        title: formatMessage({ id: 'specialGroup.operate' }),
        key: 'operate',
        width: 200,
        render: (_, record) => (
          <span>
            <a
              className="dropdown-style"
              data-operation="view"
              onClick={e => showExpandChildList(record, e)}
            >
              {formatMessage({ id: 'specialGroup.viewMember' }, '查看成员')}
              {expandArray.includes(record.segmentid) ? <Icon type="down" /> : <Icon type="up" />}
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                saveListClickItem(record);
                showGroupDetail('edit');
              }}
            >
              {formatMessage({ id: 'common.table.action.edit' }, '编辑')}
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title={formatMessage({ id: 'specialGroup.ifConfirmDelete' }, '是否确定删除')}
              onConfirm={() => deleteSpecialItem(record)}
              cancelText={formatMessage({ id: 'common.btn.cancel' }, '取消')}
              okText={formatMessage({ id: 'common.btn.confirm' }, '确定')}
            >
              <a href="#">{formatMessage({ id: 'common.table.action.delete' }, '删除')}</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
  }

  // 删除扩展成员
  async function deleteExpandItem(record) {
    await dispatch({
      type: 'specialGroup/delSegmentMember',
      payload: {
        segmentId: visitedItemId,
        subsId: record.common_id,
      },
    });
    // 重新获取分群扩展成员数据
    await getExpandList(visitedItemId, visitedItemMemberType, specialExpandPageInfo);
    updateTargetSegmentMember(visitedItemId, visitedItemMemberType);
  }

  // 删除所有扩展成员
  const deleteAllItem = useCallback(async () => {
    await dispatch({
      type: 'specialGroup/delSegmentMember',
      payload: {
        segmentId: visitedItemId,
        subsId: '',
      },
    });
    // 重新获取分群扩展成员数据
    await getExpandList(visitedItemId, visitedItemMemberType, specialExpandPageInfo);
    updateTargetSegmentMember(visitedItemId, visitedItemMemberType);
  });

  // 获取子列表的展示数据
  const getChildColums = () => {
    return [
      {
        title: formatMessage({ id: 'specialGroup.phonenumber' }),
        dataIndex: 'common_id',
        key: 'common_id',
      },
      // { title: formatMessage({ id: 'specialGroup.email' }), dataIndex: 'email', key: 'email' },
      {
        title: formatMessage({ id: 'specialGroup.customerName' }),
        dataIndex: 'common_name',
        key: 'common_name',
        render: text => text || '--',
      },
      {
        title: formatMessage({ id: 'specialGroup.operate' }),
        render: record => (
          <Popconfirm
            title="是否确定删除"
            onConfirm={() => deleteExpandItem(record)}
            cancelText="取消"
            okText="确定"
          >
            <a href="#">删除</a>
          </Popconfirm>
        ),
      },
    ];
  };

  // ------  号码选择框方法  ------
  // 获取用户列表数据
  const getNumModaldata = useCallback((id, pageInfo, visitedMemberType, value = '') => {
    dispatch({
      type: 'specialGroup/qrySubsBasicInfo',
      payload: {
        segmentId: String(id),
        commonName: String(value),
        memberType: visitedMemberType,
        pageInfo: {
          pageNum: pageInfo.pageNum,
          pageSize: pageInfo.pageSize,
        },
      },
    });
  }, []);

  // 展示号码选择弹窗
  const showNumModal = useCallback(
    (id, type) => {
      dispatch({
        type: 'specialGroup/showNumModal',
      });
      getNumModaldata(id, specialMemberPageInfo, type);
    },
    [specialMemberPageInfo],
  );

  //  隐藏号码选择弹窗
  const hiddenNumModal = useMemo(() => {
    return () => {
      setNumberSearchValue('');
      dispatch({
        type: 'specialGroup/hiddenNumModal',
      });
    };
  }, []);

  // 改变分页信息
  const changeNumPageInfo = useCallback(
    (pageNum, pageSize) => {
      dispatch({
        type: 'specialGroup/changeMemberPageInfo',
        payload: {
          pageNum,
          pageSize,
        },
      });
      getNumModaldata(
        visitedItemId,
        { pageNum, pageSize },
        visitedItemMemberType,
        numberSearchValue,
      );
    },
    [visitedItemId, numberSearchValue, visitedItemMemberType],
  );

  // 查询操作
  const serachByNum = useCallback(async () => {
    await dispatch({
      type: 'specialGroup/changeMemberPageInfo',
      payload: {
        pageNum: 1,
        pageSize: specialMemberPageInfo.pageSize,
      },
    });
    getNumModaldata(
      visitedItemId,
      { pageNum: 1, pageSize: specialMemberPageInfo.pageSize },
      visitedItemMemberType,
      numberSearchValue,
    );
  }, [visitedItemMemberType, visitedItemId, numberSearchValue, specialMemberPageInfo]);

  // 保存当前搜索的号码
  function changeSearchValue(e) {
    setNumberSearchValue(e.target.value);
  }

  // 重置操作
  const clearSearchValue = useCallback(async () => {
    await setNumberSearchValue('');
    await dispatch({
      type: 'specialGroup/changeMemberPageInfo',
      payload: {
        pageNum: 1,
        pageSize: 5,
      },
    });
    getNumModaldata(visitedItemId, { pageNum: 1, pageSize: 5 }, visitedItemMemberType, '');
  }, [visitedItemId]);

  // ------  号码选择框方法 done ------

  // --------导入导出-------

  // 显示导入模块
  const showImportModal = useCallback(() => {
    dispatch({
      type: 'specialGroup/changeImportModalState',
      payload: true,
    });
  }, [ifShowImportModal]);

  const hiddenImportModal = useCallback(() => {
    dispatch({
      type: 'specialGroup/changeImportModalState',
      payload: false,
    });
  }, [ifShowImportModal]);

  // 隐藏分群信息弹窗
  const hiddenGroupDetailModal = useCallback(() => {
    dispatch({
      type: 'specialGroup/hiddenGroupDetailModal',
    });
  }, []);

  // 点击搜索把当前分页重置为1
  function resetFirstPage() {
    dispatch({
      type: 'specialGroup/changeGroupPageInfo',
      payload: {
        pageNum: 1,
        pageSize: specialGroupPageInfo.pageSize,
      },
    });
  }

  // 分群列表改变搜索值
  async function searchBySearchValue(value) {
    await resetFirstPage();
    await getSpecialListData(value, searchNumber, specialGroupPageInfo);
  }

  function saveSearchValue(e) {
    setSearchValue(e.target.value);
  }

  // // 高级筛选修改用户号码
  // function searchByAdvancedNum(value) {
  //   resetFirstPage();
  //   getSpecialListData(searchValue, value, specialGroupPageInfo);
  // }

  function changeSegmentType(value) {
    setSearchNumber(value);
  }

  // 下拉框值改变
  function changeMemberType(value) {
    // console.log('v',value)
    setMemberType(value);
  }

  // 重置搜索条件
  const resetForm = () => {
    const { form } = props;
    form.resetFields();
  }

  // useEffect(() => {
  //   searchByAdvancedNum();
  // }, [memberType]);

  // 导航右侧菜单
  const topRightDiv = (
    <div>
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            showGroupDetail('add');
          }}
        >
          {formatMessage(
            {
              id: 'specialGroup.new',
            },
            '新增分群',
          )}
        </Button>
      </ConfigProvider>
      {/* <a className="dropdown-style" onClick={showAdvancedFilter}>
        {formatMessage({
          id: 'common.btn.AdvancedFilter',
        })}
        {advancedFilterShow === 'none' ? <Icon type="down" /> : <Icon type="up" />}
      </a> */}
    </div>
  );

  // 高级搜索
  const AdvancedSearch = (
    <div>
      <CommonFilter 
        span={8}
        handleSubmit={searchBySearchValue}
        handleReset={resetForm}
      >
        <Form.Item
          label='分群名称'
        >
          {getFieldDecorator('segmentName', {
          })(
            <Input
              placeholder={formatMessage({ id: 'specialGroup.entergroupName' }, '请输入分群名称')}
              size="small"
              allowClear
            />
          )}
        </Form.Item>
        <Form.Item
          label={formatMessage({ id: 'specialGroup.memberType' })}
        >
          {getFieldDecorator('memberType', {
          })(
            <Select
              placeholder={formatMessage({ id: 'specialGroup.choose' }, '请选择')}
              size="small"
              allowClear
            >
              {memberTypeList.map(item => {
                return (
                  <Option key={item.attrValueCode} value={item.attrValueCode}>
                    {item.attrValueName}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label={formatMessage({ id: 'specialGroup.groupType' }, '分群类型')}
        >
          {getFieldDecorator('segmentType', {
          })(
            <Select
              placeholder={formatMessage({ id: 'specialGroup.choose' }, '请选择')}
              size="small"
              onChange={changeSegmentType}
              allowClear
            >
              {segmentTypeList &&
                segmentTypeList.map(item => {
                  return (
                    <Option key={item.id} value={item.attrValueCode}>
                      {item.attrValueName}
                    </Option>
                  );
                })}
            </Select>,
          )}
        </Form.Item>
      </CommonFilter>
    </div>
  );

  const { IfShowNumModal, IfShowGroupDetailModal, specialGroupList } = props;
  return (
    <div className={styles.specialListWrapper}>
      <Card
        title={formatMessage({ id: 'specialGroup.eventRuleList' }, '分群列表')}
        extra={topRightDiv}
        className="common-card"
        size="small"
      >
        {AdvancedSearch}
        <Table
          loading={loading.effects['specialGroup/querySegmentDetailInfo']}
          columns={getColums()}
          dataSource={specialGroupList}
          rowKey={record => record.segmentid}
          expandedRowRender={record => (
            <ExpandRowChild
              showNumModal={() => showNumModal(visitedItemId, visitedItemMemberType)}
              getChildColums={getChildColums}
              specialExpandList={specialExpandList}
              deleteAllItem={deleteAllItem}
              getExpandList={getExpandList}
              visitedItemId={visitedItemId}
              showImportModal={showImportModal}
              visitedItemMemberType={visitedItemMemberType}
              itemData={record}
            />
          )}
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          expandedRowKeys={expandArray}
          pagination={false}
        />
        <Pagination
          showQuickJumper
          showSizeChanger
          defaultCurrent={1}
          defaultPageSize={5}
          current={specialGroupPageInfo.pageNum}
          total={specialGroupListTotal}
          style={{ float: 'right' }}
          className={styles.ruleInfoPagination}
          onChange={changePageInfo}
          onShowSizeChange={changePageInfo}
          pageSizeOptions={['5', '10', '20', '30', '40']}
        />
      </Card>
      {IfShowNumModal ? (
        <ChooseNumModal
          hiddenNumModal={hiddenNumModal}
          changePageInfo={changeNumPageInfo}
          getExpandList={getExpandList}
          visitedItemId={visitedItemId}
          serachByNum={serachByNum}
          searchValue={numberSearchValue}
          changeSearchValue={changeSearchValue}
          clearSearchValue={clearSearchValue}
          visitedItemMemberType={visitedItemMemberType}
          updateTargetSegmentMember={updateTargetSegmentMember}
        />
      ) : null}
      {IfShowGroupDetailModal !== 'null' ? (
        <GroupDetailModal
          hiddenGroupDetailModal={hiddenGroupDetailModal}
          fold={fold}
          getSpecialListData={getSpecialListData}
          resetFirstPage={resetFirstPage}
          updateTargetSegmentMember={updateTargetSegmentMember}
        />
      ) : null}
      {ifShowImportModal ? (
        <ImportModal
          hiddenImportModal={hiddenImportModal}
          getExpandList={getExpandList}
          updateTargetSegmentMember={updateTargetSegmentMember}
        />
      ) : null}
    </div>
  );
}

export default connect(stateToProps)(Form.create()(GroupList));
