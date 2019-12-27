import React, { useState } from 'react';
import { Modal, Radio } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
// 导出模块
const mapStateToProps = ({ specialGroup }) => ({
  specialListClickItem: specialGroup.specialListClickItem,
});
function ExportModal(props) {
  const { ifShowExportModal, closeModal, specialListClickItem } = props;
  const [radioState, setRadioState] = useState('XLSX');

  // 改变选择的类型
  function onChange(e) {
    setRadioState(e.target.value);
  }

  // 导出弹窗提交按钮
  function handleOk() {
    const { segmentid, memberType } = specialListClickItem;
    // const target = window.location.origin;
    const url = `/mccm-service/mccm/marketmgr/SegmentController/exportSegmentMember?segmentId=${segmentid}&fileType=${radioState}&memberType=${memberType}`;
    const a = document.createElement('a');
    a.href = url;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    closeModal();
  }

  return (
    <Modal
      title={formatMessage({id: 'specialGroup.segmentDownload'})}
      onOk={handleOk}
      visible={ifShowExportModal}
      onCancel={closeModal}
    >
      <div>{formatMessage({id: 'specialGroup.selectDownloadFileType'})}</div>
      <Radio.Group onChange={onChange} value={radioState}>
        <Radio value="xlsx">XLSX</Radio>
        <Radio value="csv">CSV</Radio>
        <Radio value="txt">TXT</Radio>
      </Radio.Group>
    </Modal>
  );
};

export default connect(mapStateToProps)(ExportModal);
