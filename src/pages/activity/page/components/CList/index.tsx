import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ResourcesModal from '../ResourcesModal';
import styles from './index.less';

interface IProps {
  value?: any;
  onChange?: any;
  resources: IResource[];
}

export default function CList(props: IProps) {
  const { value = [], onChange, resources } = props;
  const resourcesModal = useRef<any>();
  const [cList, setCList] = useState<IResource[]>(
    resources.filter((item) => value.includes(item.id)),
  );

  const onAdd = () => {
    resourcesModal.current.onShow();
  };

  useEffect(() => {
    onChange(cList);
  }, [cList]);

  const onAddOk = (item: IResource) => {
    setCList([...cList, item]);
  };
  const onDel = (id: string) => {
    setCList(cList.filter((item) => item.id != id));
  };
  return (
    <div className={styles.cList}>
      {cList.map((item) => {
        const { id, type } = item;
        return (
          <div key={id}>
            <div className={styles.type}>{type}</div>
            <Button type="link" onClick={() => onDel(id)}>
              删除
            </Button>
          </div>
        );
      })}
      <Button type="primary" onClick={onAdd}>
        +
      </Button>
      <ResourcesModal sucCb={onAddOk} ref={resourcesModal} />
    </div>
  );
}
