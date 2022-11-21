import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Modal, message } from 'antd';
import { SForm } from '@szsk/rac';
import { IFormItem } from '@szsk/rac/lib/Form/type';
import { cookieUtils } from '@szsk/utils';
import { OPERATE_TYPE } from '@/constants';
import { UserService } from '@/service';

interface IProps {
  sucCb: any;
}

const AddModal = forwardRef((props: IProps, ref) => {
  const { sucCb } = props;
  const [opType, setType] = useState<number>(OPERATE_TYPE.ADD);
  const [detail, setDetail] = useState<IUser>({});
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const { userId } = detail;
  useImperativeHandle(ref, () => {
    return {
      onShow,
    };
  });
  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const onShow = (type: number, record: IUser) => {
    const { username } = record || {};
    setDetail(record || {});
    form.setFieldsValue({
      username,
    });
    setType(type);
    setVisible(true);
  };
  const onOk = () => {
    form.validateFields().then(async (values) => {
      const params = { ...values };
      let res = null;
      if (opType === OPERATE_TYPE.ADD) {
        res = await UserService.addUser(params);
      } else {
        res = await UserService.updateUser({ ...params, id: userId });
      }
      const [err, data] = res;
      if (!err) {
        message.success('操作成功');
        sucCb();
        onCancel();
      }
    });
  };

  const formItems: IFormItem[] = [
    {
      id: 'username',
      label: '账号',
      type: 'input',
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
      title={`${OPERATE_TYPE.toString(opType)}用户`}
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
