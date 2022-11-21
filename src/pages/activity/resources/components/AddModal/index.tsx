import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Modal, message } from 'antd';
import { SForm } from '@szsk/rac';
import { IFormItem } from '@szsk/rac/lib/Form/type';
import { ResourceService } from '@/service';

interface IProps {
  sucCb: any;
  typeEnum: IOption[];
}

const AddModal = forwardRef((props: IProps, ref) => {
  const { sucCb, typeEnum } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  useImperativeHandle(ref, () => {
    return {
      onShow,
    };
  });
  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const onShow = () => {
    setVisible(true);
  };
  const onOk = () => {
    form.validateFields().then(async (values) => {
      const [err, data] = await ResourceService.addResource(values);
      if (!err) {
        message.success('操作成功');
        sucCb();
        onCancel();
      }
    });
  };

  const formItems: IFormItem[] = [
    {
      id: 'atomId',
      label: '组件类型',
      type: 'select',
      options: typeEnum,
      rules: [
        {
          required: true,
        },
      ],
    },
  ];

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      title="新增资源"
      okText="确认"
      cancelText="取消"
      maskClosable={false}
    >
      <SForm
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        columns={1}
        formItems={formItems}
      />
    </Modal>
  );
});

export default AddModal;
