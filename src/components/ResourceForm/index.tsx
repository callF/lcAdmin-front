import { Button, Form, Input } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { RenderItem } from './components/RenderItem';
import styles from './index.less';

interface IProps {
  config: any;
  sucCb: any;
}

export default function ResourceForm(props: IProps) {
  const { config = {}, sucCb } = props;
  const [form] = Form.useForm();

  const configList = useMemo(() => {
    const loop = (obj: any) => {
      const _list: any[] = [];
      Object.keys(obj).forEach((key, idx) => {
        const item = obj[key];
        const { type, children } = item;
        if (type === 'FieldsGroup' || type === 'List') {
          item.children = loop(children);
        }
        _list.push({ ...item, id: key });
      });
      return _list;
    };
    return loop(config);
  }, [config]);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      sucCb(values);
    });
  };

  return (
    <div className={styles.resourceForm}>
      <Form form={form}>
        {configList.map((item) => {
          return RenderItem(item);
        })}
        <Form.Item>
          <Button onClick={onSubmit}>提交</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
