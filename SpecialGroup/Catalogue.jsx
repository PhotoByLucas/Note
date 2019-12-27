import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Input,
  Modal,
  Form,
  message,
  // notification
} from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import SearchTree from '@/components/SearchTree/index';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
@connect(commodityList => ({
  submitData: commodityList.submitData,
}))
@Form.create()
class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      treeData: [],
      returnData: [],
      defaultSelectedKeys: [],
    };
  }

  componentWillMount() {
    this.getTreeData({ setDefault: true });
  }

  getTreeData = options => {
    const { dispatch, getNodeInfo } = this.props;
    dispatch({
      type: 'specialGroup/getChooseTreeList',
      payload: {
        // fold: -1,
        objType: 3,
      },
    }).then(res => {
      if (res && res.topCont && res.topCont.resultCode === 0) {
        const newArr = this.dealData(res.svcCont.data);
        const defaultSelectedKey =
          newArr && newArr.length && newArr[0].key && newArr[0].key.toString();
        const pathCode = newArr && newArr.length && newArr[0].pathCode;
        if (options && options.setDefault) {
          this.setState({
            treeData: newArr,
            returnData: res.svcCont.data,
            defaultSelectedKeys: [defaultSelectedKey],
          });
          getNodeInfo(defaultSelectedKey, pathCode);
        } else {
          this.setState({
            treeData: newArr,
            returnData: res.svcCont.data,
          });
        }
      }
    });
  };

  // 添加目录
  addMccFolder = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'specialGroup/addFolder',
      payload: params,
    }).then(res => {
      if (res && res.topCont && res.topCont.resultCode === 0) {
        this.getTreeData();
      } else {
        message.error(res.topCont.remark);
      }
    });
  };

  updateMccFolder = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'specialGroup/updateFolder',
      payload: params,
    }).then(res => {
      if (res && res.topCont && res.topCont.resultCode === 0) {
        this.getTreeData();
      } else {
        message.error(res.topCont.remark);
      }
    });
  };

  delMccFolder = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'specialGroup/delMccFolder',
      payload: params,
    }).then(res => {
      if (res && res.topCont && res.topCont.resultCode === 0) {
        this.getTreeData();
      } else {
        message.error(res.topCont.remark);
      }
    });
  };

  dealData = data => {
    const len = data.length;
    const treeArr = data.map(item => ({
      title: item.name,
      key: item.fold,
      comments: item.comments,
      pathCodeLen: item.pathCode.split('.').length,
      parentKey: item.parentFold || '',
      children: [],
      used: false,
      curOperate: '',
      curItem: {},
      pathCode: item.pathCode,
    }));
    const newArr = [];
    const getChild = (node, index) => {
      // 拿到当前节点的子节点
      if (index === len - 1) {
        return;
      }
      for (let i = 0; i < len; i += 1) {
        // 如果当前节点的路径长度大于 node 且 parentKey = node.key 那么它就是 node 的子元素
        if (
          treeArr[i].pathCodeLen > node.pathCodeLen &&
          treeArr[i].parentKey === node.key &&
          !treeArr[i].used
        ) {
          node.children.push(treeArr[i]);
          treeArr[i].used = true;
          getChild(treeArr[i], i);
        }
      }
    };
    for (let i = 0; i < len; i += 1) {
      if (treeArr[i].pathCodeLen === 1) {
        newArr.push(treeArr[i]);
        treeArr[i].used = true;
        getChild(treeArr[i], i);
      }
    }
    return newArr;
  };

  addCata = () => {
    this.setState({
      addModal: true,
    });
  };

  handleModalOk = () => {
    const { form } = this.props;
    const { curOperate, curItem } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          addModal: false,
        });
        const { title, comments } = values;
        if (curOperate === 'add') {
          const obj = {
            comments, // 目录描述
            name: title, // 目录名称
            objType: 3, // 对象类型，写死为3
            parentFold: curItem.key, // 父级目录
            state: 'A', // 状态
          };
          this.addMccFolder(obj);
        } else if (curOperate === 'edit') {
          const obj = {
            comments, // 目录描述
            name: title, // 目录名称
            objType: 3, // 对象类型，写死为3
            parentFold: curItem.parentId, // 父级目录
            fold: curItem.key, // 活动目录id
          };
          this.updateMccFolder(obj);
        }
      }
    });
  };

  handleModalCancel = () => {
    this.setState({
      addModal: false,
    });
  };

  handleSubmit = () => {};

  addCallBack = item => {
    this.setState({
      addModal: true,
      curOperate: 'add',
      curItem: item,
    });
    const { form } = this.props;
    form.resetFields();
  };

  editCallBack = item => {
    this.setState({
      addModal: true,
      curOperate: 'edit',
      curItem: item,
    });
    const { form } = this.props;
    form.setFieldsValue({
      title: item.title,
      comments: item.comments || '',
    });
  };

  deleteCallBack = item => {
    const obj = {
      comments: item.comments, // 目录描述
      name: item.title, // 目录名称
      objType: 3, // 对象类型，写死为3
      parentFold: item.parentId, // 父级目录
      fold: item.key, // 活动目录id
    };
    this.delMccFolder(obj);
  };

  getPathCode = key => {
    const { returnData } = this.state;
    let pathcode = '';
    returnData.forEach(item => {
      if (String(item.fold) === String(key)) {
        pathcode = `${pathcode}${item.pathCode}`;
      }
    });
    return pathcode;
  };

  onSelectCallBack = key => {
    const { getNodeInfo } = this.props;
    const pathCode = this.getPathCode(key);
    getNodeInfo(key, pathCode);
  };

  render() {
    const { addModal, treeData, defaultSelectedKeys } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const treeProps = {
      treeData,
      defaultSelectedKeys,
      add: true,
      edit: true,
      del: true,
      addCallBack: this.addCallBack,
      editCallBack: this.editCallBack,
      deleteCallBack: this.deleteCallBack,
      onSelectCallBack: this.onSelectCallBack,
      defaultExpandedKeys: defaultSelectedKeys,
    };
    return (
      <Card
        title={formatMessage({ id: 'specialGroup.catalogueTitle' }, '分群目录')}
        className="common-card"
        size="small"
      >
        {treeData && treeData.length > 0 && <SearchTree {...treeProps} />}
        <Modal
          title={formatMessage({ id: 'commodityManage.name.foldInfo' })}
          visible={addModal}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label={formatMessage({ id: 'commodityManage.name.foldName' })}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'commodityManage.tip.foldNameTip' }),
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'commodityManage.name.foldNote' })}>
              {getFieldDecorator('comments', {
                rules: [],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}

export default Catalogue;
