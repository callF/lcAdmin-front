import React, { useEffect, useRef, useState } from 'react';
import { SSearch } from '@szsk/rac';
import { Button, Divider, message, Modal, Table } from 'antd';
import { IFormItem } from '@szsk/rac/lib/Form/type';
import { ColumnsType } from 'antd/lib/table';
import ContentWrapper from '@/components/ContentWrapper';
import styles from './index.less';
import { DEFAULT_CONDITION, OPERATE_TYPE } from '@/constants';
import { UserService } from '@/service';
import AddModal from './components/AddModal';

export default function Page() {
  const [condition, setCondition] = useState<IGetUserParams>(DEFAULT_CONDITION);
  const [list, setList] = useState<IUser[]>([]);
  const [total, setTotal] = useState<number>(0);
  const form = useRef<any>();
  useEffect(() => {
    getList();
  }, [condition]);

  const getList = async () => {
    const [err, data] = await UserService.getUsers(condition);
    if (!err) {
      const { totalSize, list: _list } = data;
      setList(_list);
      setTotal(totalSize);
    }
  };

  const onParamChange = (data?: IGetUserParams) => {
    setCondition({ ...condition, ...(data || {}) });
  };

  const formItems: IFormItem[] = [
    {
      type: 'input',
      label: '账号',
      id: 'username',
    },
    {
      type: 'datePicker',
      label: '开始时间',
      id: 'startTime',
    },
    {
      type: 'datePicker',
      label: '结束时间',
      id: 'endTime',
    },
  ];
  const columns: ColumnsType<IUser> = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '账号',
      key: 'username',
      dataIndex: 'username',
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
      render: (v, record: IUser) => {
        const { id = '' } = record;
        return (
          <>
            <a onClick={() => onDel(id)}>删除</a>
            <Divider type="vertical" />
            <a onClick={() => onEdit(record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => onReset(id)}>重置密码</a>
          </>
        );
      },
    },
  ];

  const onReset = (id: string) => {
    Modal.confirm({
      title: '确定重置密码？',
      onOk: async () => {
        const [err, data] = await UserService.resetPassword(id);
        if (!err) {
          message.success('操作成功，密码为admin');
        }
      },
    });
  };

  const onDel = (id: string) => {
    Modal.confirm({
      title: '确定删除？',
      onOk: async () => {
        const [err, data] = await UserService.delUser(id);
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
  const onPaginationChanged = (pageNum: number, pageSize: number) => {
    onParamChange({ ...condition, pageNum, pageSize });
  };
  return (
    <ContentWrapper title="用户管理">
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
      <AddModal ref={form} sucCb={onParamChange} />
    </ContentWrapper>
  );
}
