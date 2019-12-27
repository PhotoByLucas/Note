import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Row, Col, Select, DatePicker, message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import moment from 'moment';
import styles from '../index.less';
import DragWrapper from '../Drag/index';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const formDescLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
    md: { span: 19 },
  },
};

const formNameAndTypeLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 14 },
  },
};

const stateToProps = ({ specialGroup, user }) => ({
  IfShowGroupDetailModal: specialGroup.IfShowGroupDetailModal,
  specialListClickItem: specialGroup.specialListClickItem,
  userInfo: user.userInfo,
  dropData: specialGroup.dropData,
  memberTypeList: specialGroup.memberTypeList,
});

function GroupDetail(props) {
  const {
    IfShowGroupDetailModal,
    hiddenGroupDetailModal,
    form: { getFieldDecorator },
    form,
    dispatch,
    fold,
    userInfo,
    specialListClickItem,
    resetFirstPage,
    dropData,
    // memberTypeList,
    updateTargetSegmentMember,
  } = props;
  const [selectValue, setSelectValue] = useState([]); // 下拉框静态数据
  const [selectedItem, setSelectedItem] = useState(''); // 选择的下拉框项
  const [memberTypeArr, setMemberTypeValue] = useState([]);
  // const [startDate,setStartDate] = useState()

  // 新增select的columnList传参
  // const SELECT_COLUMN_LIST = [
  //   {
  //     field_alias_name: 'field',
  //     obj_code: 'SUBS_ID',
  //     table_code: 'SUBS_BASIC',
  //   },
  // ];

  // 获取下拉框静态数据
  useEffect(() => {
    dispatch({
      type: 'specialGroup/qryAttrValueByCode',
      payload: {
        attrSpecCode: 'MCC_SEGMENT_TYPE',
        language: 'zh',
      },
    }).then(res => {
      if (res && res.topCont && res.topCont.resultCode === 0) {
        setSelectValue(res.svcCont.data);
      }
    });
  }, []);

  // 获取静态数据

  useEffect(() => {
    dispatch({
      type: 'specialGroup/qryAttrValueByCode',
      payload: {
        attrSpecCode: 'MEM_TYPE',
        language: 'zh',
      },
    }).then(res => {
      if (res && res.topCont && res.topCont.resultCode === 0) {
        setMemberTypeValue(res.svcCont.data);
      }
    });
  }, []);

  // 处理标题
  function handleTitle() {
    let title = '';
    if (IfShowGroupDetailModal === 'edit') {
      title = '编辑分群信息';
    } else if (IfShowGroupDetailModal === 'view') {
      title = '查看分群信息';
    } else if (IfShowGroupDetailModal === 'add') {
      title = '新增分群信息';
    } else {
      title = '分群信息';
    }
    return title;
  }

  // 格式化时间格式
  function handleTime() {
    const time = new Date(Date.now());
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, 0);
    const date = String(time.getDate()).padStart(2, 0);
    const hour = String(time.getHours()).padStart(2, 0);
    const min = String(time.getMinutes()).padStart(2, 0);
    const sec = String(time.getSeconds()).padStart(2, 0);
    const timeStr = `${year}-${month}-${date} ${hour}:${min}:${sec}`;
    return timeStr;
  }

  // 表单回填
  useEffect(() => {
    if (IfShowGroupDetailModal === 'edit' || IfShowGroupDetailModal === 'view') {
      form.setFieldsValue({
        groupName: specialListClickItem.segmentName,
        groupType: String(specialListClickItem.segmentType),
        segmentcount: specialListClickItem.segmentcount,
        groupDesc: specialListClickItem.description,
        createTime: moment(specialListClickItem.createdate, 'YYYY-MM-DD HH:mm:ss'),
        updateTime: moment(handleTime(Date.now()), 'YYYY-MM-DD HH:mm:ss'),
        creater: specialListClickItem.createby,
        memberType: specialListClickItem.memberType,
      });
    }
  }, [IfShowGroupDetailModal]);

  // 新增后重新获取数据
  function getSpecialListData() {
    dispatch({
      type: 'specialGroup/querySegmentDetailInfo',
      payload: {
        fold,
        segmentName: '',
        segmentType: '', // 高级筛选
        pageInfo: {
          pageNum: 1,
          pageSize: 5,
        },
      },
    });
  }

  // 格式化筛选数据
  function formatTagData(values) {
    return dropData.tagList.map((item, index) => {
      const resSeq = index + 1;
      const newItem = item.type
        ? {
            ruleType: item.ruleType,
            field_data_type: item.ruleType,
            rule_type: item.ruleType,
            ruleSeq: resSeq,
            rule_seq: resSeq,
            ruleValue: item.type === 3 ? values[`select_${item.id}`] : item.title,
            rule_value: item.type === 3 ? values[`select_${item.id}`] : item.title,
          }
        : {
            labelcode: item.title,
            name: item.title,
            objId: item.labelId,
            obj_id: item.labelId,
            ruleOperator: values[`select_${item.id}`],
            rule_operator: values[`select_${item.id}`],
            ruleType: 'simpleCond',
            rule_type: 'simpleCond',
            ruleValue: values[`value_${item.id}`],
            rule_value: values[`value_${item.id}`],
            ruleSeq: resSeq,
            rule_seq: resSeq,
            tablecode: 'MCC_SUB_EXTEND_001',
            // tablecode: item.tableCode,
            // table_Code: 'MCC_SUB_EXTEND_001',
            tar_table_code: item.tableCode,
          };
      return newItem;
    });
  }

  // 格式化输出字段数据
  function formatOutData() {
    const columnList = dropData.outList;
    columnList.forEach((cur, index) => {
      const newItem = cur;
      newItem.obj_code = 'SUBS_ID';
      newItem.field_alias_name = 'field';
      newItem.seg = index;
      // newItem.table_code = 'MCC_SUB_EXTEND_001'
      return newItem;
    });
    return columnList;
  }

  // 置空拖拽列表数据
  function resetDropData() {
    dispatch({
      type: 'specialGroup/saveDropData',
      payload: {
        tagList: [],
        outList: [],
      },
    });
  }

  // 根据分群类型名字找数值
  // function findSelectType(name) {
  //   let selectType = '';
  //   selectValue.forEach(item => {
  //     if (item.attrValueName === name) {
  //       selectType = item.attrValueCode;
  //     }
  //   });
  //   return selectType;
  // }

  // 查看状态提交
  function viewHandleOk() {
    hiddenGroupDetailModal();
  }

  // 分群信息弹窗确认
  const handleOk = () => {
    if (IfShowGroupDetailModal === 'view') {
      viewHandleOk();
    } else {
      // 编辑状态和新增状态合并处理
      const type = IfShowGroupDetailModal === 'edit' ? 'updateMccSegment' : 'insertSegment';

      form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const outList = formatOutData();
          const tagList = formatTagData(values);
          let payload;
          if (IfShowGroupDetailModal === 'add') {
            payload = {
              fold,
              name: values.groupName,
              segmentType: values.groupType,
              // segmentType: 105,
              description: values.groupDesc,
              segmentCode: values.segmentCode,
              // segmentCode: 105,
              createby: userInfo.userInfo.userName, // 创建人
              createdate: handleTime(),
              updateby: userInfo.userInfo.userName, // 更新人
              updatedate: handleTime(),
              segmentcount: 0, // 新增数量
              columnList: outList, // 输出字段
              condList: tagList, // 拖拽条件字段
              lastrundate: '',
              runby: '',
              RUNBY_NAME: '',
              cleverSegScript: '',
              state: '',
              refreshTimeUnit: '',
              refreshInterval: '',
              NEEDVALIDATENAME: 'N',
              sqlType: 0,
              memberType: values.memberType, // 成员类别
            };
          } else {
            payload = {
              segmentid: specialListClickItem.segmentid,
              segmentCode: values.segmentCode,
              segmentType: values.groupType,
              fold,
              createdate: specialListClickItem.createdate,
              createby: specialListClickItem.createby,
              updatedate: specialListClickItem.updatedate,
              updateby: specialListClickItem.updateby,
              lastrundate: '',
              runby: '',
              RUNBY_NAME: '',
              cleverSegScript: '',
              state: '',
              refreshTimeUnit: '',
              refreshInterval: '',
              NEEDVALIDATENAME: 'N',
              name: values.groupName,
              description: values.groupDesc,
              sqlType: 0,
              segmentcount: Number(values.segmentcount) ? Number(values.segmentcount) : 0,
              memberType: values.memberType, // 成员类别
            };
          }
          await dispatch({
            type: `specialGroup/${type}`,
            payload,
          }).then(res => {
            if (res && res.topCont && res.topCont.resultCode === 0) {
              if (
                IfShowGroupDetailModal === 'edit' &&
                specialListClickItem.memberType !== values.memberType
              ) {
                // 成员类型变化，需要更新分群成员数
                updateTargetSegmentMember(specialListClickItem.segmentid, values.memberType);
              }
              // 重新获取列表数据
              getSpecialListData();
              // 页数重置
              resetFirstPage();
              // 重置拖拽数据
              resetDropData();
              hiddenGroupDetailModal();
            } else {
              message.error(res.topCont.remark);
            }
          });
        }
      });
    }
  };

  // 下拉框值改变
  function changeSearchValue(value) {
    setSelectedItem(value);
  }

  return (
    <Modal
      title={handleTitle()}
      visible={IfShowGroupDetailModal !== 'null'}
      onOk={handleOk}
      onCancel={hiddenGroupDetailModal}
      className={styles.groupDetailWrapper}
      footer={
        <React.Fragment>
          <Button type="primary" size="small" onClick={handleOk}>
            {formatMessage({ id: 'specialGroup.YES' }, '确定')}
          </Button>
          <Button size="small" onClick={hiddenGroupDetailModal}>
            {formatMessage({ id: 'specialGroup.NO' }, '取消')}
          </Button>
        </React.Fragment>
      }
    >
      <Form>
        <Row>
          {/* 分群名称 */}
          <Col span={12} className={styles.ruleNameAndType}>
            <FormItem
              {...formNameAndTypeLayout}
              label={formatMessage({ id: 'specialGroup.groupName' }, '分群名称')}
            >
              {getFieldDecorator('groupName', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'specialGroup.entergroupName' }, '请输入规则名称'),
                  },
                  {
                    max: 60,
                    message: formatMessage({ id: 'specialGroup.maxEnterlen' }, '输入最大长度为60'),
                  },
                ],
              })(
                <Input
                  size="small"
                  placeholder={formatMessage({ id: 'specialGroup.enter' }, '请输入')}
                  disabled={IfShowGroupDetailModal === 'view'}
                />,
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          {/* 分群类型 */}
          <Col span={12} className={styles.ruleNameAndType}>
            <FormItem
              {...formNameAndTypeLayout}
              label={formatMessage({ id: 'specialGroup.groupType' }, '分群类型')}
            >
              {getFieldDecorator('groupType', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'specialGroup.enterRuleType' }, '请选分群类型'),
                  },
                ],
              })(
                <Select
                  size="small"
                  placeholder={formatMessage({ id: 'specialGroup.enter' }, '请输入')}
                  onSelect={changeSearchValue}
                  disabled={IfShowGroupDetailModal === 'view'}
                >
                  {selectValue.map(item => {
                    return (
                      <Option key={item.id} value={item.attrValueCode}>
                        {item.attrValueName}
                      </Option>
                    );
                  })}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>

        {/* 分群编码 */}
        {Number(selectedItem) === 105 ? (
          <Row>
            <Col span={12} className={styles.ruleNameAndType}>
              <FormItem
                {...formNameAndTypeLayout}
                label={formatMessage({ id: 'specialGroup.groupCode' }, '分群编码')}
              >
                {getFieldDecorator('segmentCode', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'specialGroup.enterCode' }, '请输入分群编码'),
                    },
                  ],
                })(
                  <Input
                    size="small"
                    placeholder={formatMessage({ id: 'specialGroup.enter' }, '请输入')}
                    readOnly={IfShowGroupDetailModal === 'view'}
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
        ) : null}

        {/* 分群成员总数 */}
        {IfShowGroupDetailModal !== 'add' ? (
          <Row>
            <Col span={12} className={styles.ruleNameAndType}>
              <FormItem
                {...formNameAndTypeLayout}
                label={formatMessage({ id: 'specialGroup.groupMemberCount' }, '分群成员总数')}
              >
                {getFieldDecorator('segmentcount', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        { id: 'specialGroup.enterMemberCount' },
                        '请选规则类型',
                      ),
                    },
                  ],
                })(
                  <Input
                    size="small"
                    placeholder={formatMessage({ id: 'specialGroup.enter' }, '请输入')}
                    disabled
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
        ) : null}

        {/* 分群描述 */}
        <Row className={styles.ruleDesc}>
          <Col>
            <FormItem
              {...formDescLayout}
              label={formatMessage({ id: 'specialGroup.groupDesc' }, '分群描述')}
            >
              {getFieldDecorator('groupDesc', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'specialGroup.enterRuleDesc' }, '请输入分群描述'),
                  },
                  {
                    max: 240,
                    message: formatMessage(
                      { id: 'specialGroup.maxEnterTextAreaLen' },
                      '输入最大长度为240',
                    ),
                  },
                ],
              })(
                <TextArea
                  size="small"
                  placeholder={formatMessage({ id: 'specialGroup.enter' }, '请输入')}
                  rows={2}
                  disabled={IfShowGroupDetailModal === 'view'}
                />,
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          {/* 成员类别 */}
          <Col span={12} className={styles.ruleNameAndType}>
            <FormItem
              {...formNameAndTypeLayout}
              label={formatMessage({ id: 'specialGroup.memberType' }, '成员类别')}
            >
              {getFieldDecorator('memberType', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'specialGroup.enterRuleType' }, '请选成员类别'),
                  },
                ],
              })(
                <Select
                  size="small"
                  placeholder={formatMessage({ id: 'specialGroup.choose' }, '请选择')}
                  disabled={IfShowGroupDetailModal === 'view'}
                >
                  {memberTypeArr.map(item => {
                    return (
                      <Option key={item.attrValueCode} value={item.attrValueCode}>
                        {item.attrValueName}
                      </Option>
                    );
                  })}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>

        {IfShowGroupDetailModal !== 'add' ? (
          <Row>
            {/* 分群时间信息 */}
            <Col span={12}>
              {/* 创建时间 */}
              <Row span={8}>
                <FormItem
                  {...formNameAndTypeLayout}
                  label={formatMessage({ id: 'specialGroup.createTime' }, '创建时间')}
                >
                  {getFieldDecorator('createTime')(
                    <DatePicker
                      // disabledDate={disabledStartDate}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      // value={startValue}
                      disabled
                      placeholder={formatMessage({ id: 'specialGroup.choose' }, '请选择')}
                      readOnly={IfShowGroupDetailModal === 'view'}
                      // onChange={onStartChange}
                      // onOpenChange={handleStartOpenChange}
                    />,
                  )}
                </FormItem>
              </Row>
              {/* 修改时间 */}
              <Row span={8}>
                <FormItem
                  {...formNameAndTypeLayout}
                  label={formatMessage({ id: 'specialGroup.updateTime' }, '修改时间')}
                >
                  {getFieldDecorator('updateTime')(
                    <DatePicker
                      // disabledDate={disabledStartDate}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      // value={startValue}
                      disabled
                      placeholder={formatMessage({ id: 'specialGroup.choose' }, '请选择')}
                      // onChange={onStartChange}
                      // onOpenChange={handleStartOpenChange}
                    />,
                  )}
                </FormItem>
              </Row>
              {/* <Row span={8}>
                <FormItem
                  {...formNameAndTypeLayout}
                  label={formatMessage({ id: 'specialGroup.lastUseTime' }, '最近运行日期')}
                >
                  {getFieldDecorator('lastUseTime')(
                    <DatePicker
                      // disabledDate={disabledStartDate}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      // value={startValue}
                      disabled
                      placeholder={formatMessage({ id: 'specialGroup.choose' }, '请选择')}
                      // onChange={onStartChange}
                      // onOpenChange={handleStartOpenChange}
                    />,
                  )}
                </FormItem>
              </Row> */}
            </Col>

            {/* 分群用户信息 */}
            {/* <Col span={12}>
              <Row span={8}>
                <FormItem
                  {...formNameAndTypeLayout}
                  label={formatMessage({ id: 'specialGroup.creater' }, '创建人')}
                >
                  {getFieldDecorator('creater', {
                    rules: [
                      {
                        message: formatMessage({ id: 'specialGroup.enterCreater' }, '请输入创建人'),
                      },
                    ],
                  })(
                    <Input
                      size="small"
                      placeholder={formatMessage({ id: 'specialGroup.enter' }, '请输入')}
                      disabled
                    />,
                  )}
                </FormItem>
              </Row>
              <Row span={8}>
                <FormItem
                  {...formNameAndTypeLayout}
                  label={formatMessage({ id: 'specialGroup.updater' }, '更新人')}
                >
                  {getFieldDecorator('updater', {
                    rules: [
                      {
                        message: formatMessage({ id: 'specialGroup.enterUpdater' }, '请输入更新人'),
                      },
                    ],
                  })(
                    <Input
                      size="small"
                      placeholder={formatMessage({ id: 'specialGroup.enter' }, '请输入')}
                      disabled
                    />,
                  )}
                </FormItem>
              </Row>
              <Row span={8}>
                <FormItem
                  {...formNameAndTypeLayout}
                  label={formatMessage({ id: 'specialGroup.lastUser' }, '运行人')}
                >
                  {getFieldDecorator('lastUser', {
                    rules: [
                      {
                        message: formatMessage(
                          { id: 'specialGroup.enterRuleType' },
                          '请选规则类型',
                        ),
                      },
                    ],
                  })(
                    <Input
                      size="small"
                      placeholder={formatMessage({ id: 'specialGroup.enter' }, '请输入')}
                      disabled
                    />,
                  )}
                </FormItem>
              </Row>
            </Col> */}
          </Row>
        ) : null}
        {/* 拖拽框 */}
        {/* <DragWrapper form={form} /> */}

        {Number(selectedItem) === 105 ? <DragWrapper form={form} /> : null}
      </Form>
    </Modal>
  );
}

export default Form.create()(connect(stateToProps)(GroupDetail));
