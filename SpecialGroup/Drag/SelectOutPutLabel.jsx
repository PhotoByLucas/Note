import React from 'react';
import { Tag, Icon } from 'antd';
import styles from './index.less';

function SelectOutPutLabel(props) {
  const { item, disabled, handleTagDragEnd, handleTagDragStart, removeItem } = props;
  // 拖拽标签下拉框数据
  return (
    <div
      id={`tagItem_${item.id}`}
      draggable
      onDragEnd={e => handleTagDragEnd(item, e)}
      onDragStart={() => handleTagDragStart(item)}
    >
      <div className={styles.tagBox}>
        {item.type !== 3 ? <Tag className={styles.tagItem}>{item.title}</Tag> : null}
        {!disabled ? (
          <Icon type="close-circle" theme="filled" onClick={() => removeItem(item,1)} />
        ) : null}
      </div>
    </div>
  );
}

export default SelectOutPutLabel;
