import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, message, Tag } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import SearchTree from '@/components/SearchTree';
import SelectLabel from './SelectLabel';
import SelectOutPutLabel from './SelectOutPutLabel';
import styles from './index.less';

const stateToProps = ({ specialGroup }) => ({
  dropData: specialGroup.dropData,
  IfShowGroupDetailModal: specialGroup.IfShowGroupDetailModal,
});

function SelectWrapper(props) {
  // sql 标签
  const TAG_LIST = [
    {
      title: '(',
      type: 1,
      ruleType: 'bracket',
    },
    {
      title: ')',
      type: 2,
      ruleType: 'bracket',
    },
    {
      title: 'and/or',
      type: 3,
      ruleType: 'connectOpt',
    },
  ];
  const { dispatch, form } = props;
  // const {dropData,IfShowGroupDetailModal} = props;
  // 左侧目录树数据
  const [dimList, setDimList] = useState([]);
  const dimListData = useRef([]);
  // 缓存左侧目录树数据
  const dimListIdArrCache = useRef([]);
  // 右侧筛选条件拖拽标签列表
  const [tagList, setTagList] = useState([]);
  // 右侧输出字段拖拽标签列表
  const [outList, setOupList] = useState([]);
  // 拖拽事件信息
  const eventInfo = useRef({
    // 标识 是否绑定dragEnter(进入目标对象范围)
    bindFlag: false,
    // 标识 是否在放置区域: true，index，false
    enterFlag: false,
    // 拖拽索引
    dragIndex: 0,
    // 标签内拖拽排序选中id
    tagDragId: '',
  });
  // false：未进入放置区域 , true：进入放置区域
  // 1: 上方输出字段区域  2：下方筛选条件字段
  const ifFirst = useRef(false); // 是否是拖到上区域

  // useEffect(() => {
  //   if (IfShowGroupDetailModal === 'edit' || IfShowGroupDetailModal === 'view') {
  //     setTagList(dropData.tagList);
  //     setOupList(dropData.outList);
  //   }
  // }, []);

  // 根据id遍历已有标签树，返回对应treeItem
  function findTreeItem(id, treeArr) {
    let treeItem;
    treeArr.forEach(item => {
      if (item.id === id) {
        treeItem = item;
      } else if (item.children && item.children.length) {
        treeItem = findTreeItem(id, item.children);
      }
    });
    return treeItem;
  }

  // 整理左侧目录树数据
  function formmatDimList(id, data) {
    const treeArr = data.map(item => ({
      id: item.id,
      parentGrpId: item.parent_grp_id,
      labelId: item.obj_id,
      title: item.name || '',
      key: item.id,
      isLeaf: !item.isParent,
      children: [],
      labelValueType: item.label_value_type,
      labelDataType: item.label_Date_type,
      table_code: item.tar_table_code,
    }));
    let newArr = [].concat(dimList);
    if (!id) {
      newArr = treeArr;
    } else {
      treeArr.forEach(item => {
        const parentItem = findTreeItem(`cat_${item.parentGrpId}`, newArr);
        if (parentItem) {
          parentItem.children.push(item);
        }
      });
    }
    dimListData.current = newArr;
    setDimList(newArr);
  }

  // 保存拖拽数据
  function saveDropData(data) {
    dispatch({
      type: 'specialGroup/saveDropData',
      payload: data,
    });
  }

  // 为拖拽放置区 切换移动active效果
  function switchEmptyActive(flag) {
    // 操作dom添加active样式
    // 区分是拖动到上面还是拖动到下面
    const target = ifFirst.current === 1 ? 'outWrapper' : 'tagWrapper';
    const { childNodes } = document.getElementById(target);
    const index =
      eventInfo.current.enterFlag === true ? childNodes.length - 1 : eventInfo.current.enterFlag;
    childNodes.forEach((ele, i) => {
      const item = ele;
      if (eventInfo.current.enterFlag === true) {
        item.className = flag && index === i ? 'tagRightActive' : '';
      } else {
        item.className = flag && index === i ? 'tagLeftActive' : '';
      }
      // 标签内拖拽排序，隐藏目标元素
      if (flag && eventInfo.current.tagDragId == item.id.substr(item.id.indexOf('_') + 1)) {
        item.className = item.className ? `${item.className} tagHide` : 'tagHide';
      }
    });
  }

  // 返回target对应的tagWrapper的子节点
  function findTagItem(target) {
    let tagNode;
    if (target && target.id && target.id.indexOf('tagItem_') === 0) {
      tagNode = target;
    } else if (target && target.parentNode) {
      tagNode = findTagItem(target.parentNode);
    }
    return tagNode;
  }

  // dragEnter 事件
  /**
   * dragEnter事件，根据拖拽放置区 判断添加数据的情况，赋值到this.eventInfo.enterFlag
   * 1. tagWrapper，添加到末尾
   * 2. tagItem，添加到tagItem前
   * 3. tagWrapper外，不添加
   */
  function handleDragEnter(e) {
    if (e && e.target) {
      // 1，返回 true(插入末尾的状态)
      if (e.target.id === 'outWrapper') {
        ifFirst.current = 1;
        eventInfo.current.enterFlag = true;
        switchEmptyActive(true);
        return;
      }
      if (e.target.id === 'tagWrapper') {
        ifFirst.current = 2;
        eventInfo.current.enterFlag = true;
        switchEmptyActive(true);
        return;
      }
      // 2 返回 index(记录当前插入列表中的顺序)
      const tagItem = findTagItem(e.target);
      if (tagItem) {
        if (tagItem.childNodes[0] && tagItem.childNodes[0].childElementCount) {
          if (tagItem.childNodes[0].childElementCount < 4) {
            ifFirst.current = 1;
          } else {
            ifFirst.current = 2;
          }
          eventInfo.current.enterFlag = Array.prototype.indexOf.call(
            tagItem.parentNode.childNodes,
            tagItem,
          );
          switchEmptyActive(true);
          return;
        }
      }
    }
    // 3 返回 false
    eventInfo.current.enterFlag = false;
    switchEmptyActive(false);
  }

  // 开始拖拽，添加dragEnter监听
  function handleDragStart(item) {
    // 如果是目录树拖拽 item，不执行监听
    if (item && item.node && item.node.props && item.node.props.eventKey.indexOf('cat_') === 0) {
      return;
    }
    eventInfo.current.tagDragId = (item && item.id) || '';
    if (!eventInfo.current.bindFlag) {
      eventInfo.current.bindFlag = true;
      document.addEventListener('dragenter', handleDragEnter);
    }
  }

  // 左侧目录树拖拽完毕，移除dragEnter监听，并更新数据
  const handleDragEnd = item => {
    if (eventInfo.current.bindFlag) {
      document.removeEventListener('dragenter', handleDragEnter);
      eventInfo.current.bindFlag = false;
    }
    let newItem;
    if (item && item.node && item.node.props) {
      const { node } = item;
      if (node.props && node.props.eventKey.indexOf('cat_') === 0) {
        message.warn(formatMessage({ id: 'activityConfigManage.select.move' }), '只可以移动标签');
        return;
      }
      const selectTreeItem = findTreeItem(node.props.eventKey, dimListData.current);
      newItem = selectTreeItem || {};
    } else {
      // 筛选条件标签
      newItem = item;
    }
    if (eventInfo.current.enterFlag !== false) {
      // 移除移动active效果
      switchEmptyActive();
      const newTag = ifFirst.current === 2 ? [...tagList] : [...outList];
      const newTagList = [].concat(newTag) || [];
      eventInfo.current.dragIndex += 1;
      const newTagItem = { ...newItem, id: eventInfo.current.dragIndex };
      // 添加到数组末尾
      if (eventInfo.current.enterFlag === true) {
        newTagList.push(newTagItem);
      } else {
        // 添加到索引位置处
        newTagList.splice(eventInfo.current.enterFlag, 0, newTagItem);
      }
      if (ifFirst.current === 2) {
        setTagList(newTagList);
        saveDropData({ tagList: newTagList, outList });
      } else if (ifFirst.current === 1) {
        setOupList(newTagList);
        saveDropData({ tagList, outList: newTagList });
      }
    }
  };

  // 标签内排序
  function handleTagDragEnd(item) {
    if (eventInfo.bindFlag) {
      document.removeEventListener('dragenter', handleDragEnter);
      eventInfo.bindFlag = false;
    }
    // 移除拖拽active效果
    switchEmptyActive();
    if (eventInfo.current.enterFlag !== false) {
      const newTag = ifFirst.current === 2 ? [...tagList] : [...outList];
      let newTagList = [].concat(newTag) || [];
      if (eventInfo.current.enterFlag === true) {
        newTagList = newTagList.filter(ele => {
          return ele.id !== item.id;
        });
        newTagList.push(item);
      } else {
        eventInfo.current.dragIndex += 1;
        const newItem = { ...item, id: eventInfo.current.dragIndex };
        newTagList.splice(eventInfo.current.enterFlag, 0, newItem);
        newTagList = newTagList.filter(ele => {
          return ele.id !== item.id;
        });
      }
      if (ifFirst.current === 2) {
        setTagList(newTagList);
        saveDropData({ tagList: newTagList, outList });
      } else if (ifFirst.current === 1) {
        setOupList(newTagList);
        saveDropData({ tagList, outList: newTagList });
      }
    }
  }

  // 删除标签
  function removeTagItem(item, kind) {
    const newTag = kind === 2 ? [...tagList] : [...outList];
    const newArr = newTag.filter(ele => {
      return item.id !== ele.id;
    });
    if (kind === 2) {
      setTagList(newArr);
      saveDropData({ tagList: newArr, outList });
    } else if (kind === 1) {
      setOupList(newArr);
      saveDropData({ tagList, outList: newArr });
    }
  }

  // 获取左侧目录树
  function getDimList(id) {
    if (dimListIdArrCache.current.indexOf(id) == -1) {
      // 已经发起请求
      if (id) dimListIdArrCache.current.push(id);
      // 这里可以改成容错处理,如果失败了重复请求3次后就提示报错
      dispatch({
        type: 'specialGroup/getDimList',
        payload: {
          id,
        },
      }).then(res => {
        if (res && res.topCont && res.topCont.resultCode == 0) {
          formmatDimList(id, res.svcCont.data);
        } else {
          message.error(res.topCont.remark);
        }
      });
    }
  }

  // 选中标签
  function onSelectCallBack(key) {
    if (key.includes('cat_')) {
      getDimList(key);
    }
  }

  useEffect(() => {
    getDimList();
  }, []);

  const treeProps = {
    // loadData: treeNode => getDimList(treeNode.props.eventKey),
    draggable: true,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    treeData: dimList,
    showButtons: false,
    // handleAsyncSearch,
    ignoreCaseFlag: true,
    onSelectCallBack,
  };

  // const handleAsyncSearch = useCallback(() => {}, []);

  return (
    <Row className={styles.dragWrapper}>
      <Col span={5}>
        <p className={styles.title}>
          {formatMessage({ id: 'specialGroup.selectCatalog' }, '标签目录')}
        </p>
        <div className={styles.dragLeftWrapper}>
          <SearchTree {...treeProps} />
        </div>
      </Col>
      <Col span={19}>
        <div className={styles.rightLabel}>
          <Row span="12" className={styles.outputWrapper}>
            <div className={styles.outputSelect}>
              {/* 输出字段 */}
              <p className={[`${styles.title}`, `${styles.label}`].join(' ')}>
                {formatMessage({ id: 'activityConfigManage.select.outputSelect' }, '输出字段')}
              </p>
              <div id="outWrapper" className={styles.tagWrapper}>
                {outList.map(item => (
                  <SelectOutPutLabel
                    ifFirst={ifFirst.current}
                    item={item}
                    key={item.id}
                    form={form}
                    handleTagDragStart={() => handleDragStart()}
                    handleTagDragEnd={handleTagDragEnd}
                    removeItem={removeTagItem}
                    // disabled={disabled}
                  />
                ))}
              </div>
            </div>
          </Row>

          {/* 筛选条件 */}
          <Row span={12} className={styles.outputWrapper}>
            <div className={styles.outputSelect}>
              <p className={[`${styles.title}`, `${styles.label}`].join(' ')}>
                {formatMessage({ id: 'activityConfigManage.select.conditions' }, '筛选条件')}
              </p>
              <div style={{ marginTop: 12 }} className={styles.condition}>
                {/* 筛选条件标签 */}
                {TAG_LIST.map(item => (
                  <Tag
                    key={item.type}
                    draggable
                    onDragStart={() => handleDragStart()}
                    onDragEnd={e => handleDragEnd(item, e)}
                  >
                    {item.title}
                  </Tag>
                ))}
              </div>
              {/* 拖拽标签列表 */}
              <div id="tagWrapper" className={styles.tagWrapper}>
                {tagList.map(item => (
                  <SelectLabel
                    ifFirst={ifFirst.current}
                    item={item}
                    key={item.id}
                    form={form}
                    handleTagDragStart={() => handleDragStart()}
                    handleTagDragEnd={handleTagDragEnd}
                    removeItem={removeTagItem}
                    // disabled={disabled}
                  />
                ))}
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

export default connect(stateToProps)(SelectWrapper);
