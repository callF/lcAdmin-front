import { Form, Input, DatePicker, Radio } from 'antd';
import React, { useMemo } from 'react';

export const RenderItem = (item: any) => {
  const { type, title, id, options, children } = item;
  const _type: string = type.slice(0, 1).toLowerCase() + type.slice(1);
  const text = () => {
    return <Input />;
  };
  const list = () => {
    return children.map((_item: any) => {
      return RenderItem(_item);
    });
  };
  const fieldsGroup = () => {
    return children.map((_item: any) => {
      return RenderItem(_item);
    });
  };
  const multiText = () => {
    return <Input.TextArea />;
  };
  const datePicker = () => {
    return <DatePicker format="YYYY-MM-DD" />;
  };
  const radio = () => {
    return <Radio.Group options={options} />;
  };
  const dateRangePicker = () => {
    return <DatePicker.RangePicker format="YYYY-MM-DD" />;
  };

  const classes = {
    text,
    list,
    fieldsGroup,
    multiText,
    datePicker,
    radio,
    dateRangePicker,
  };

  return (
    <Form.Item name={id} label={title}>
      {classes[_type]()}
    </Form.Item>
  );
};
