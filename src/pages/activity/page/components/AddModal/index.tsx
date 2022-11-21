import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Form, Modal, message } from 'antd';
import { SForm } from '@szsk/rac';
import { IFormItem } from '@szsk/rac/lib/Form/type';
import { cookieUtils } from '@szsk/utils';
import { INFINITE_PAGE_SIZE, OPERATE_TYPE } from '@/constants';
import { PageService, ResourceService, UserService } from '@/service';
import CList from '../CList';

interface IProps {
  sucCb: any;
}

const AddModal = forwardRef((props: IProps, ref) => {
  const { sucCb } = props;
  const [opType, setType] = useState<number>(OPERATE_TYPE.ADD);
  const [detail, setDetail] = useState<IPage>({});
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [resources, setResources] = useState<IResource[]>([]);
  const { id } = detail;
  useImperativeHandle(ref, () => {
    return {
      onShow,
    };
  });
  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const onShow = (type: number, record: IPage) => {
    // const { username } = record || {};
    // setDetail(record || {});
    // form.setFieldsValue({
    //   username,
    // });
    setType(type);
    setVisible(true);
  };
  const onOk = () => {
    form.validateFields().then(async (values) => {
      const { cList } = values;
      const params = {
        ...values,
        cList: cList.map((item: IResource) => item.id),
      };
      let res = null;
      if (opType === OPERATE_TYPE.ADD) {
        res = await PageService.addPage(params);
      } else {
        res = await PageService.updatePage({ ...params, id });
      }
      const [err, data] = res;
      if (!err) {
        message.success('操作成功');
        sucCb();
        onCancel();
      }
    });
  };

  useEffect(() => {
    getResourceList();
  }, []);

  const getResourceList = async () => {
    const [err, data] = await ResourceService.getResources({
      pageNum: 1,
      pageSize: INFINITE_PAGE_SIZE,
    });
    if (!err) {
      const { list: _list } = data;
      setResources(_list);
    }
  };

  const formItems: IFormItem[] = [
    {
      id: 'name',
      label: '页面名称',
      type: 'input',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      id: 'path',
      label: '路径',
      type: 'input',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      id: 'cList',
      label: '组件',
      render: () => {
        return <CList resources={resources} />;
      },
    },
  ];

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={`${OPERATE_TYPE.toString(opType)}页面`}
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
