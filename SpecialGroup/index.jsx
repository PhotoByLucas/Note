import React from 'react';
import { connect } from 'dva';
import { Col, Row } from 'antd';
// import { connect } from 'dva';
import Catalogue from './Catalogue';
import SpecialGroupList from './SpecialGroupList';
@connect(({ common }) => ({
  attrSpecCodeList: common.attrSpecCodeList,
}))
class SpecialGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      pathcode: '',
    };
  }

  componentDidMount = () => {
    this.getSpecCode();
  };
  
  // 获取字典数值
  getSpecCode() {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/qryAttrValueByCode',
      payload: {
        attrSpecCode: 'MEM_TYPE',
      },
    });
  }

  getNodeInfo = (key, pathcode) => {
    this.setState({
      key,
      pathcode,
    });
  };

  render() {
    const { attrSpecCodeList } = this.props;
    const { key, pathcode } = this.state;
    return (
      <div>
        <Row type="flex" gutter={16}>
          <Col span={5}>
            <Catalogue getNodeInfo={this.getNodeInfo} />
          </Col>
          <Col span={19}>
            <SpecialGroupList nodeKey={key} nodePath={pathcode} memberTypeList={attrSpecCodeList.MEM_TYPE} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SpecialGroup;
