import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Form, Select, Tag, Input, Icon, DatePicker, InputNumber, Switch } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
const stateToProps = ({ specialGroup, user }) => ({
  IfShowNewGroup: specialGroup.IfShowNewGroup,
  userInfo: user.userInfo,
});

function SelectLabel(props) {
  const { item, disabled, handleTagDragEnd, handleTagDragStart, removeItem, form } = props;
  // 拖拽标签下拉框数据
  const [labelValueList, setLabelValueList] = useState([]);
  const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };
  const OPTIONS_LIST = ['=', '<>', '>', '<', '>=', '<=', 'IN', 'BETWEEN', 'LIKE', 'NOT IN'];

  const AND_OR_LIST = ['and', 'or'];

  // 获取标签类型
  function getLabelValueType() {
    let {
      item: { labelDataType },
    } = props;
    const {
      item: { labelValueType },
    } = props;
    // 标签值类型：枚举类型，枚举值只能选择等于
    if (labelValueType == '2000') {
      labelDataType = 'attr';
    }
    return labelDataType;
  }

  // 根据标签ID去获取对应的下拉框数据，比如年龄范围，性别类型等
  function getLabelValueList() {
    const { dispatch } = props;
    dispatch({
      type: 'specialGroup/getLabelValueList',
      payload: {
        labelId: item.labelId,
      },
      callback: res => {
        if (res.data) {
          setLabelValueList(res.data);
        }
      },
    });
  }

  useEffect(() => {
    const labelDataType = getLabelValueType();
    // 枚举类型，获取标签选项值列表
    if (labelDataType === 'attr' || (labelDataType === undefined && item.labelId)) {
      getLabelValueList();
    }
  }, []);

  function renderLabel() {
    const labelDataType = getLabelValueType();
    let ele;
    // 枚举型 / 有枚举值的情况
    if (labelDataType === 'attr' || labelValueList.length) {
      ele = (
        <Select
          disabled={disabled}
          placeholder={formatMessage({ id: 'common.form.select' })}
          size="small"
        >
          {labelValueList
            ? labelValueList.map(lists => {
                const value = lists.valueName;
                return (
                  <Select.Option title={value} key={value} value={value}>
                    {value}
                  </Select.Option>
                );
              })
            : null}
        </Select>
      );
    } else {
      switch (labelDataType) {
        // 日期型
        case '1000': {
          ele = (
            <DatePicker
              disabled={disabled}
              size="small"
              placeholder={formatMessage({ id: 'common.form.select' })}
            />
          );
          break;
        }
        // 日期时间型
        case '1100': {
          ele = (
            <DatePicker
              disabled={disabled}
              size="small"
              placeholder={formatMessage({ id: 'common.form.select' })}
            />
          );
          break;
        }
        // 字符型
        case '1200': {
          ele = (
            <Input
              disabled={disabled}
              size="small"
              placeholder={formatMessage({ id: 'common.form.input' })}
            />
          );
          break;
        }
        // 浮点型
        case '1300': {
          ele = <InputNumber disabled={disabled} size="small" />;
          break;
        }
        // 整数型
        case '1400': {
          ele = <InputNumber disabled={disabled} size="small" />;
          break;
        }
        // 布尔型
        case '1500': {
          ele = <Switch disabled={disabled} size="small" />;
          break;
        }
        // 计算型
        case '1600': {
          ele = <InputNumber disabled={disabled} size="small" />;
          break;
        }
        default: {
          ele = (
            <Input
              disabled={disabled}
              size="small"
              placeholder={formatMessage({ id: 'common.form.input' })}
            />
          );
        }
      }
    }
    return ele;
  }

  function renderOptions() {
    const labelDataType = getLabelValueType();
    let indexs = [];
    // 枚举型 / 有枚举值的情况
    if (labelDataType === 'attr' || labelValueList.length) {
      indexs = [0, 6, 8, 9];
    } else {
      switch (labelDataType) {
        // 日期型
        case '1000': {
          indexs = [0, 1, 2, 3, 4, 5];
          break;
        }
        // 日期时间型
        case '1100': {
          indexs = [0, 1, 2, 3, 4, 5];
          break;
        }
        // 字符型
        case '1200': {
          indexs = [0, 1, 2, 3, 4, 5, 6, 8, 9];
          break;
        }
        // 浮点型
        case '1300': {
          indexs = [0, 1, 2, 3, 4, 5, 6, 9];
          break;
        }
        // 整数型
        case '1400': {
          indexs = [0, 1, 2, 3, 4, 5, 6, 9];
          break;
        }
        // 布尔型
        case '1500': {
          indexs = [0];
          break;
        }
        // 计算型
        case '1600': {
          indexs = [0];
          break;
        }
        default: {
          indexs = [0, 1, 2, 3, 4, 5, 6, 8, 9];
        }
      }
    }
    let optionsList = OPTIONS_LIST;

    if (item.type === 3) {
      // and / or
      indexs = [0, 1];
      optionsList = AND_OR_LIST;
    }

    return indexs.map(ele => {
      const value = optionsList[ele];
      return (
        <Select.Option disabled={disabled} key={value} value={value}>
          {value}
        </Select.Option>
      );
    });
  }

  return (
    <div
      id={`tagItem_${item.id}`}
      draggable
      onDragEnd={e => handleTagDragEnd(item, e)}
      onDragStart={() => handleTagDragStart(item)}
    >
      <div className={styles.tagBox}>
        {/* item.type 为3 : 是筛选条件的标签
        {id: 2,ruleType: "connectOpt",title: "and/or",type: 3} */}
        {/* item.type 不为3 ：是目录树标签
          children: [],
          id: 3,
          isLeaf: true,
          key: "label_10028",
          labelDataType: undefined,
          labelId: 10028,
          labelValueType: "2000",
          parentGrpId: 10001,
          tableCode: "MCC_SUB_EXTEND_001",
          title: "性别-用户label" */}
        {item.type !== 3 ? <Tag className={styles.tagItem}>{item.title}</Tag> : null}
        {/* 筛选条件标签 或者 sql标签（=、IN、LIKE、NOT IN） */}
        {item.type === 3 || !item.type ? (
          <div className={styles.tagItem}>
            <Form.Item {...formItemLayout}>
              {form.getFieldDecorator(`select_${item.id}`, {
                rules: [
                  {
                    required: true,
                    message: '请选择'
                  },
                ],
                initialValue:
                  item.selectValue || (item.type === 3 ? AND_OR_LIST[0] : OPTIONS_LIST[0]),
              })(<Select size="small">{renderOptions()}</Select>)}
            </Form.Item>
          </div>
        ) : null}
        {/* 目录树拖拽标签 */}
        {!item.type ? (
          <div className={styles.tagItem}>
            <Form.Item {...formItemLayout}>
              {form.getFieldDecorator(`value_${item.id}`, {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'common.form.required',
                    }),
                  },
                ],
                initialValue: item.value,
              })(renderLabel())}
            </Form.Item>
          </div>
        ) : null}
        {!disabled ? (
          <Icon type="close-circle" theme="filled" onClick={() => removeItem(item,2)} />
        ) : null}
      </div>
    </div>
  );
}

export default connect(stateToProps)(SelectLabel);
