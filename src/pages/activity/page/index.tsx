import React, { useEffect, useRef, useState } from 'react';
import { SSearch } from '@szsk/rac';
import { Button, Divider, message, Modal, Table } from 'antd';
import { IFormItem } from '@szsk/rac/lib/Form/type';
import { ColumnsType } from 'antd/lib/table';
import { history } from 'umi';
import ContentWrapper from '@/components/ContentWrapper';
import styles from './index.less';
import { DEFAULT_CONDITION, OPERATE_TYPE } from '@/constants';
import { PageService, UserService } from '@/service';
import AddModal from './components/AddModal';

export default function Page() {
  const [condition, setCondition] = useState<IGetPageParams>(DEFAULT_CONDITION);
  const [list, setList] = useState<IPage[]>([]);
  const [total, setTotal] = useState<number>(0);
  const form = useRef<any>();
  useEffect(() => {
    getList();
  }, [condition]);

  const getList = async () => {
    const [err, data] = await PageService.getPages(condition);
    if (!err) {
      const { totalSize, list: _list } = data;
      setList(_list);
      setTotal(totalSize);
    }
  };

  const onParamChange = (data?: IGetPageParams) => {
    setCondition({ ...condition, ...(data || {}) });
  };

  const formItems: IFormItem[] = [
    {
      type: 'input',
      label: '页面名称',
      id: 'name',
    },
    {
      type: 'input',
      label: '路径',
      id: 'path',
    },
  ];
  const columns: ColumnsType<IPage> = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '页面名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '路径',
      key: 'path',
      dataIndex: 'path',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (v, record: IPage) => {
        const { id = '', path = '' } = record;
        return (
          <>
            <a onClick={() => onDel(id)}>删除</a>
            <Divider type="vertical" />
            <a onClick={() => onEdit(record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => onPreview(path)}>预览</a>
          </>
        );
      },
    },
  ];

  const onPreview = (path: string) => {
    history.push(`/activity/page/preview?path=${encodeURIComponent(path)}`);
  };

  const onDel = (id: string) => {
    Modal.confirm({
      title: '确定删除？',
      onOk: async () => {
        const [err, data] = await PageService.delPage(id);
        if (!err) {
          message.success('操作成功');
          onParamChange();
        }
      },
    });
  };
  const onEdit = (record: IUser) => {
    form.current.onShow(OPERATE_TYPE.EDIT, record);
  };
  const onAdd = () => {
    form.current.onShow(OPERATE_TYPE.ADD);
  };
  return (
    <ContentWrapper title="页面管理">
      <SSearch onSearch={onParamChange} formItems={formItems} />
      <Button onClick={onAdd}>新增</Button>
      <Table dataSource={list} columns={columns} />
      <AddModal ref={form} sucCb={onParamChange} />
    </ContentWrapper>
  );
}
