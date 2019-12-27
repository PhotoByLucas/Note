import React, { useState } from 'react';
import { Modal, Button, Upload, message, Icon, Radio } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import styles from '../index.less';
const mapStateToProps = ({ loading, specialGroup }) => ({
  loading,
  ifShowImportModal: specialGroup.ifShowImportModal,
  specialListClickItem: specialGroup.specialListClickItem,
  confirmLoading: loading.effects['specialGroup/impSegMember'],
});

function ImportModal(props) {
  const {
    ifShowImportModal,
    hiddenImportModal,
    specialListClickItem,
    dispatch,
    confirmLoading,
    getExpandList,
    updateTargetSegmentMember,
  } = props;
  // 数据插入方式
  const [insertMode, setInsertMode] = useState(1);
  // 是否解析前缀
  // const [parsePre, setParsePre] = useState(false);
  // 保存上傳文件返回的路徑
  const [fileUrl, setFileUrl] = useState();
  const target = window.location.origin;
  const lists = ['xls', 'xlsx', 'csv', 'txt'];

  function impSegMember() {
    const { segmentid, memberType } = specialListClickItem;
    dispatch({
      type: 'specialGroup/impSegMember',
      payload: {
        segmentId: segmentid,
        importType: insertMode === 1 ? 'A' : 'R',
        // parsePrefix: parsePre,
        filePath: fileUrl,
        memberType,
      },
      callback: async () => {
        
        setFileUrl();
        await getExpandList(segmentid, memberType);
        updateTargetSegmentMember(segmentid, memberType);
        hiddenImportModal();
      }
    });
  }

  function handleOk() {
    impSegMember();
  }

  // 文件上传前的格式和大小校验
  function beforeUpload(file) {
    const isTrueTem =
      file.type === 'text/plain' ||
      file.type === 'application/vnd.ms-excel' ||
      file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      /(\.(xlsx|xls))$/.test(file.name);
    if (!isTrueTem) {
      // message.error('You can only upload xls/xlsx/csv/txt file!');
      message.error(formatMessage({ id: 'specialGroup.uploadFileFormatInfo' }));
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      // message.error('File must smaller than 3MB!');
      message.error(formatMessage({ id: 'specialGroup.fileSizeLimitInfo' }));
    }
    return isTrueTem && isLt3M;
  }

  // 文件状态改变
  function handleChange(info) {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      if(info.file.response.svcCont.data.fileLocation) {
        setFileUrl(info.file.response.svcCont.data.fileLocation);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const attribute = {
    name: 'files[]',
    // action: `${target}/mccm-service/mccm/marketmgr/SegmentController/impSegMember`,
    action: `/mccm-service/mccm/marketmgr/SegmentController/saveFile`,
    data: file => {
      // segemtnId: specialListClickItem.segmentid.toString(),
      // importType: insertMode === 1 ? 'A' : 'D',
      // parsePrefix: parsePre,
      const { name } = file;
      return {
        addType: insertMode === 1 ? 'A' : 'R',
        memberType: specialListClickItem.memberType,
        FILE_PATH: name,
      }
    },
    beforeUpload,
    onChange: handleChange,
  };

  // 下载模版文件
  function downTemplate(type) {
    const url = `${target}/mccm-service/mccm/marketmgr/SegmentController/downloadFile?fileType=${type}`;
    const a = document.createElement('a');
    a.href = url;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // 改变插入方式
  function changeInsertMode(e) {
    setInsertMode(e.target.value);
  }

  // // 改变是否解析状态
  // function changeParseMode(e) {
  //   setParsePre(e.target.checked);
  // }

  return (
    <Modal
      title={formatMessage({ id: 'specialGroup.fileImport' }, '文件导入')}
      visible={ifShowImportModal}
      onCancel={hiddenImportModal}
      onOk={handleOk}
      className={styles.importModal}
      confirmLoading={!!confirmLoading}
    >
      <Upload {...attribute} className={styles.uploadWrapper}>
        <Button>
          <Icon type="upload" /> {formatMessage({ id: 'specialGroup.clickToUpload' }, '点击上传')}
        </Button>
      </Upload>
      <Radio.Group onChange={changeInsertMode} value={insertMode}>
        <Radio value={1}>{formatMessage({ id: 'specialGroup.append' }, '追加')}</Radio>
        <Radio value={2}>{formatMessage({ id: 'specialGroup.replace' }, '替换')}</Radio>
      </Radio.Group>
      {/* <div>
        <Checkbox onChange={changeParseMode}>
          {formatMessage({ id: 'specialGroup.parsePrefix' }, '解析前缀')}
        </Checkbox>
        {parsePre ? (
          <span className={styles.warn}>
            {formatMessage({ id: 'specialGroup.importingWillSlow' }, '（导入过程比较慢）')}
          </span>
        ) : null}
      </div> */}

      <div className={styles.importText}>
        <div>
          {formatMessage({ id: 'specialGroup.maxSizeLimit' }, '文件最大限制')}: <span className={styles.warn}>3M</span>
        </div>
        <div>{formatMessage({ id: 'specialGroup.importedFileType' })}：xls / xlsx / csv / txt</div>
        <div>{formatMessage({ id: 'specialGroup.format' },'格式')}： Service Number</div>
        <div className={styles.downTypes}>
          {formatMessage({ id: 'specialGroup.downloadTemplate' },'下载模板')}:
          {lists.map(item => {
            return (
              <a
                href="#"
                className={[`${styles[item]}`, `${styles.ligntColor}`].join(' ')}
                key={item}
                onClick={() => downTemplate(item)}
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default connect(mapStateToProps)(ImportModal);
