import { SSearch } from '@szsk/rac';
import { IFormItem } from '@szsk/rac/lib/Form/type';
import { Button, message, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { ResourceService } from '@/service';
import { DEFAULT_CONDITION } from '@/constants';
import styles from './index.less';

interface IProps {
  sucCb: any;
}

const ResourcesModal = forwardRef((props: IProps, ref) => {
  const { sucCb } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedRows, setRows] = useState<any[]>([]);
  const [condition, setCondition] = useState<IGetResourceParams>(
    DEFAULT_CONDITION,
  );
  const [list, setList] = useState<IResource[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    getList();
  }, [condition]);
  const formItems: IFormItem[] = [
    {
      type: 'input',
      label: '资源编号',
      id: 'code',
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
  ];
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

  const onPaginationChanged = (pageNum: number, pageSize: number) => {
    onParamChange({ ...condition, pageNum, pageSize });
  };

  const onSelect = (keys: any[], items: IResource[]) => {
    setRows(items);
  };
  useImperativeHandle(ref, () => {
    return {
      onShow,
    };
  });
  const onShow = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
    setRows([]);
  };

  const onOk = () => {
    if (!selectedRows.length) {
      return message.success('请选择');
    }
    onCancel();
    sucCb(selectedRows[0]);
  };

  return (
    <Modal
      onOk={onOk}
      onCancel={onCancel}
      visible={visible}
      title="资源选择"
      okText="确认"
      cancelText="取消"
      className={styles.resourcesModal}
    >
      <Table
        rowKey="id"
        pagination={{
          total,
          onChange: onPaginationChanged,
        }}
        rowSelection={{
          selectedRowKeys: selectedRows.map((item) => item.id),
          onChange: onSelect,
        }}
        dataSource={list}
        columns={columns}
      />
    </Modal>
  );
});

export default ResourcesModal;
