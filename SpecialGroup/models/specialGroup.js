import { message } from 'antd';
import {
  queryMccFolderList,
  addFolder,
  updateFolder,
  delMccFolder,
  qryRootFolder,
  qrySubsBasicInfo,
  querySegmentDetailInfo,
  insertSegment,
  deleteMccSegment,
  updateMccSegment,
  qryAttrValueByCode,
  getDimList,
  getLabelValueList,
  selectSegmentMembers,
  delSegmentMember,
  batchInsertSegMember,
  updateSegmentMember,
  selectSegmentMemberCount,
  impSegMember,
  saveFile,
} from '@/services/specialGroup';

export default {
  namespace: 'specialGroup',
  state: {
    // 是否显示号码选择弹窗
    IfShowNumModal: false,
    // 是否显示分群信息弹窗
    IfShowGroupDetailModal: 'null',
    // 分群列表数据
    specialGroupList: [],
    // 分群列表数据总条数
    specialGroupListTotal: 0,
    specialGroupPageInfo: {
      pageNum: 1,
      pageSize: 5,
    },
    // 用户列表
    specialMemberList: [],
    // 用户列表总条数
    specialMemberListTotal: 0,
    // 用户列表分页数据
    specialMemberPageInfo: {
      pageNum: 1,
      pageSize: 5,
    },
    // 分群列表当前点击项
    specialListClickItem: {},
    // 分群成员扩展列表数据
    specialExpandList: [],
    // 分群成员扩展列表数据总数
    specialExpandListTotal: 0,
    // 分群成员扩展列表分页信息
    specialExpandPageInfo: {
      pageNum: 1,
      pageSize: 5,
    },
    // 导入弹窗展示
    ifShowImportModal: false,
    // 导出弹窗展示
    ifShowExportModal: false,
    // 拖拽数据
    dropData: {
      tagList: [], // 筛选条件数据
      outList: [], // 输出字段数据
    },
  },
  effects: {
    // ------ 目录树接口
    // 获取选择商品产品目录树数据
    *getChooseTreeList({ payload }, { call }) {
      const response = yield call(queryMccFolderList, payload);
      return response;
    },

    // 特殊分群首页的目录树新增接口
    *addFolder({ payload }, { call }) {
      const response = yield call(addFolder, payload);
      return response;
    },

    // 特殊分群首页的目录树修改接口
    *updateFolder({ payload }, { call }) {
      const response = yield call(updateFolder, payload);
      return response;
    },

    // 特殊分群首页的目录树删除接口
    *delMccFolder({ payload }, { call }) {
      const response = yield call(delMccFolder, payload);
      return response;
    },

    // 特殊分群首页的目录树查询接口
    *qryRootFolder({ payload }, { call }) {
      const response = yield call(qryRootFolder, payload);
      return response;
    },

    // ------- 目录树接口 done

    // 查询用户列表
    *qrySubsBasicInfo({ payload }, { call, put }) {
      const response = yield call(qrySubsBasicInfo, payload);
      if (response && response.topCont && response.topCont.resultCode == 0) {
        yield put({
          type: 'saveMemberList',
          payload: response,
        });
      }
      return response;
    },

    // 查询分群列表
    *querySegmentDetailInfo({ payload }, { call, put }) {
      const response = yield call(querySegmentDetailInfo, payload);
      if (response && response.topCont && response.topCont.resultCode == 0) {
        yield put({
          type: 'saveGroupList',
          payload: response,
        });
      }
      return response;
    },

    // 查询分群扩展成员列表
    *selectSegmentMembers({ payload }, { call, put }) {
      const response = yield call(selectSegmentMembers, payload);
      if (response && response.topCont && response.topCont.resultCode == 0) {
        yield put({
          type: 'saveExpandList',
          payload: response,
        });
      } else {
        message.error(response && response.topCont && response.topCont.remark);
      }
      return response;
    },

    *delSegmentMember({ payload }, { call }) {
      const response = yield call(delSegmentMember, payload);
      return response;
    },

    *batchInsertSegMember({ payload }, { call }) {
      const response = yield call(batchInsertSegMember, payload);
      return response;
    },

    // ------ 分群列表增删改查
    // 新增
    *insertSegment({ payload }, { call }) {
      const response = yield call(insertSegment, payload);
      return response;
    },

    // 删除
    *deleteMccSegment({ payload }, { call }) {
      const response = yield call(deleteMccSegment, payload);
      return response;
    },

    // 修改
    *updateMccSegment({ payload }, { call }) {
      const response = yield call(updateMccSegment, payload);
      return response;
    },

    // -------- 分群列表增删改查 done
    // 静态数据获取
    *qryAttrValueByCode({ payload }, { call }) {
      const response = yield call(qryAttrValueByCode, payload);
      return response;
    },

    // 新增分群目录树
    *getDimList({ payload }, { call }) {
      const res = yield call(getDimList, payload);
      return res;
    },
    // 获取筛选条件数据
    *getLabelValueList({ payload, callback }, { call }) {
      const res = yield call(getLabelValueList, payload);
      if (res && res.topCont && res.topCont.resultCode == 0) {
        if (callback) callback(res.svcCont);
      } else message.error(res.topCont.remark || '获取标签选项值失败');
    },

    *updateSegmentMember({ payload, callback }, { call }) {
      try {
        const res = yield call(updateSegmentMember, payload);
        if (res && res.topCont && res.topCont.resultCode === 0) {
          if (callback) callback();
        } else {
          message.error(res && res.topCont && res.topCont.remark);
        }
      } catch (err) {
        message.error(err);
      }
    },

    *selectSegmentMemberCount({ payload, callback }, { call }) {
      try {
        const res = yield call(selectSegmentMemberCount, payload);
        if (res && res.topCont && res.topCont.resultCode === 0) {
          callback(res.svcCont);
        } else {
          message.error(res && res.topCont && res.topCont.remark);
        }
      } catch (err) {
        message.error(err);
      }
    },

    *impSegMember({ payload, callback }, { call }) {
      try {
        const res = yield call(impSegMember, payload);
        if (res && res.topCont && res.topCont.resultCode === 0) {
          callback(res.svcCont);
          message.success(res.svcCont && res.svcCont.data && res.svcCont.data.alertMsg);
        } else {
          message.error((res && res.topCont && res.topCont.remark) || '导入失败');
        }
      } catch (err) {
        message.error(err);
      }
    },

    *saveFile({ payload, callback }, { call }) {
      try {
        const res = yield call(saveFile, payload);
        if (res && res.topCont && res.topCont.resultCode === 0) {
          callback(res.svcCont);
        } else {
          message.error(res && res.topCont && res.topCont.remark);
        }
      } catch (err) {
        message.error(err);
      }
    },
  },
  reducers: {
    // 保存用户列表数据
    saveMemberList(state, { payload }) {
      return Object.assign({}, state, {
        specialMemberList: payload.svcCont.data,
        specialMemberListTotal: payload.svcCont.pageInfo.total,
      });
    },

    // 保存分群列表数据
    saveGroupList(state, { payload }) {
      return Object.assign({}, state, {
        specialGroupList: payload.svcCont.data,
        specialGroupListTotal: payload.svcCont.pageInfo.total,
      });
    },

    // 保存分群扩展成员列表数据
    saveExpandList(state, { payload }) {
      const { data } = payload.svcCont;
      const list = data.filter(item => !!item);
      return Object.assign({}, state, {
        specialExpandList: list,
        specialExpandListTotal: payload.svcCont.pageInfo.total,
      });
    },

    // 显示号码选择弹窗
    showNumModal(state) {
      return Object.assign({}, state, { IfShowNumModal: true });
    },
    // 隐藏号码选择弹窗
    hiddenNumModal(state) {
      return Object.assign({}, state, { IfShowNumModal: false });
    },
    // 改变号码选择框页面数据
    changeGroupPageInfo(state, { payload: specialGroupPageInfo }) {
      return Object.assign({}, state, { specialGroupPageInfo });
    },
    // 改变号码选择框页面数据
    changeMemberPageInfo(state, { payload: specialMemberPageInfo }) {
      return Object.assign({}, state, { specialMemberPageInfo });
    },
    // 改变号码选择框页面数据
    changeExpandPageInfo(state, { payload: specialExpandPageInfo }) {
      return Object.assign({}, state, { specialExpandPageInfo });
    },
    // 显示分群详情信息
    showGroupDetailModal(state, { payload }) {
      return Object.assign({}, state, { IfShowGroupDetailModal: payload });
    },
    // 隐藏分群详情信息
    hiddenGroupDetailModal(state) {
      return Object.assign({}, state, { IfShowGroupDetailModal: 'null' });
    },
    // 保存当前点击项
    saveGroupListClickItem(state, { payload: specialListClickItem }) {
      return Object.assign({}, state, { specialListClickItem });
    },
    // 导入模块
    changeImportModalState(state, { payload: ifShowImportModal }) {
      return Object.assign({}, state, { ifShowImportModal });
    },
    // 导出模块
    changeExportModalState(state, { payload: ifShowExportModal }) {
      return Object.assign({}, state, { ifShowExportModal });
    },
    saveDropData(state, { payload: dropData }) {
      return Object.assign({}, state, { dropData });
    },
    // 更新当前分群的分群成员数
    updateTargetSegmentCount(
      state,
      {
        payload: { segmentId, segmentCount },
      },
    ) {
      const { specialGroupList } = state;
      const currentSpecialGroupList = specialGroupList.map(specialGroup => {
        let resSpecialGroup = { ...specialGroup };
        if (specialGroup.segmentId === segmentId) {
          resSpecialGroup = { ...resSpecialGroup, segmentcount: segmentCount };
        }
        return resSpecialGroup;
      });

      return Object.assign({}, state, { specialGroupList: [...currentSpecialGroupList] });
    },
  },
};
