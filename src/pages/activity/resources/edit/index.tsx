import React, { useEffect, useState } from 'react';
import { useLocation } from 'umi';
import ContentWrapper from '@/components/ContentWrapper';
import styles from './index.less';
import { ResourceService } from '@/service';
import ResourceForm from '@/components/ResourceForm';

export default function Page() {
  const location: any = useLocation();
  const { id } = location.query;
  const [detail, setDetail] = useState<IResource>({});
  const { atom } = detail;
  const { description, propertyObj } = atom || {};
  // console.log(detail);

  // 获取详情
  useEffect(() => {
    id && getDetail();
  }, []);

  const getDetail = async () => {
    const [err, data] = await ResourceService.getDetail(id);
    if (!err) {
      setDetail(data);
    }
  };

  const submit = async (_data: any) => {
    const [err, data] = await ResourceService.updateResource({
      id,
      configObj: _data,
    });
    if (!err) {
      debugger;
    }
  };
  return (
    <ContentWrapper title={`${description}`}>
      <ResourceForm config={propertyObj} sucCb={submit} />
    </ContentWrapper>
  );
}
