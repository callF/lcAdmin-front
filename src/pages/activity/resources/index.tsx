import React, { useEffect, useRef, useState } from 'react';
import { SSearch } from '@szsk/rac';
import { Button, Divider, message, Modal, Table } from 'antd';
import { IFormItem } from '@szsk/rac/lib/Form/type';
import { ColumnsType } from 'antd/lib/table';
import { history } from 'umi';
import ContentWrapper from '@/components/ContentWrapper';
import styles from './index.less';
import {
  DEFAULT_CONDITION,
  INFINITE_PAGE_SIZE,
  OPERATE_TYPE,
} from '@/constants';
import { AtomService, ResourceService } from '@/service';
import AddModal from './components/AddModal';

export default function Page() {
  const [condition, setCondition] = useState<IGetResourceParams>(
    DEFAULT_CONDITION,
  );
  const [list, setList] = useState<IResource[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [types, setTypes] = useState<IAtom[]>([]);
  const addModal = useRef<any>();
  useEffect(() => {
    getList();
  }, [condition]);

  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    const [err, data] = await AtomService.getAtoms({
      pageNum: 1,
      pageSize: INFINITE_PAGE_SIZE,
    });
    if (!err) {
      const { list: _list } = data;
      setTypes(_list);
    }
  };

  const getList = async () => {
    const [err, data] = await ResourceService.getResources(condition);
    if (!err) {
      const { totalSize, list: _list } = data;
      setList(_list);
      setTotal(totalSize);
    }
  };

  const onParamChange = (data?: IGetResourceParams) => {
    setCondition({ ...condition, ...(data || {}) });
  };

  const typeEnum = types.map((item) => ({
    label: item.description || '',
    value: item.id || '',
  }));

  const formItems: IFormItem[] = [
    {
      type: 'input',
      label: '资源编号',
      id: 'code',
    },
    {
      type: 'select',
      label: '组件类别',
      options: typeEnum,
      id: 'atomId',
    },
  ];
  const columns: ColumnsType<IResource> = [
    {
      title: '资源Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (v, record: IResource) => {
        const { id = '' } = record;
        return (
          <>
            <a onClick={() => onDel(id)}>删除</a>
            <Divider type="vertical" />
            <a onClick={() => onEdit(id)}>编辑</a>
          </>
        );
      },
    },
  ];

  const onDel = (id: string) => {
    Modal.confirm({
      title: '确定删除？',
      onOk: async () => {
        const [err, data] = await ResourceService.delResource(id);
        if (!err) {
          message.success('操作成功');
          onParamChange();
        }
      },
    });
  };
  const onEdit = (id: string) => {
    history.push(`/activity/resources/edit?id=${id}`);
  };
  const onAdd = () => {
    addModal.current.onShow(OPERATE_TYPE.ADD);
  };
  const onPaginationChanged = (pageNum: number, pageSize: number) => {
    onParamChange({ ...condition, pageNum, pageSize });
  };
  return (
    <ContentWrapper title="资源管理">
      <SSearch onSearch={onParamChange} formItems={formItems} />
      <Button onClick={onAdd}>新增</Button>
      <Table
        pagination={{
          total,
          onChange: onPaginationChanged,
        }}
        dataSource={list}
        columns={columns}
      />
      <AddModal typeEnum={typeEnum} ref={addModal} sucCb={onParamChange} />
    </ContentWrapper>
  );
}
