import React, { useEffect, useRef, useState } from 'react';
import { SSearch } from '@szsk/rac';
import { Button, Divider, message, Modal, Table } from 'antd';
import { IFormItem } from '@szsk/rac/lib/Form/type';
import { ColumnsType } from 'antd/lib/table';
import ContentWrapper from '@/components/ContentWrapper';
import styles from './index.less';
import { DEFAULT_CONDITION, OPERATE_TYPE } from '@/constants';
import { AtomService } from '@/service';
import AddModal from './components/AddModal';

export default function Page() {
  const [condition, setCondition] = useState<IGetAtomParams>(DEFAULT_CONDITION);
  const [list, setList] = useState<IAtom[]>([]);
  const [total, setTotal] = useState<number>(0);
  const addModal = useRef<any>();
  useEffect(() => {
    getList();
  }, [condition]);

  const getList = async () => {
    const [err, data] = await AtomService.getAtoms(condition);
    if (!err) {
      const { totalSize, list: _list } = data;
      setList(_list);
      setTotal(totalSize);
    }
  };

  const onParamChange = (data?: IGetAtomParams) => {
    setCondition({ ...condition, ...(data || {}) });
  };

  const formItems: IFormItem[] = [
    {
      type: 'input',
      label: '组件名称',
      id: 'description',
    },
    {
      type: 'input',
      label: '组件类型',
      id: 'type',
    },
  ];
  const columns: ColumnsType<IAtom> = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '组件类型',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: '组件名称',
      key: 'description',
      dataIndex: 'description',
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
      render: (v, record: IAtom) => {
        const { id = '' } = record;
        return (
          <>
            <a onClick={() => onDel(id)}>删除</a>
          </>
        );
      },
    },
  ];

  const onDel = (id: string) => {
    Modal.confirm({
      title: '确定删除？',
      onOk: async () => {
        const [err, data] = await AtomService.delAtom(id);
        if (!err) {
          message.success('操作成功');
          onParamChange();
        }
      },
    });
  };
  const onAdd = () => {
    addModal.current.onShow(OPERATE_TYPE.ADD);
  };
  const onPaginationChanged = (pageNum: number, pageSize: number) => {
    onParamChange({ ...condition, pageNum, pageSize });
  };
  return (
    <ContentWrapper title="组件管理">
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
      <AddModal ref={addModal} sucCb={onParamChange} />
    </ContentWrapper>
  );
}
