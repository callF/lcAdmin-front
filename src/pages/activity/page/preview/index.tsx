import React, { useEffect, useState } from 'react';
import { useLocation } from 'umi';
import ContentWrapper from '@/components/ContentWrapper';
import styles from './index.less';
import { PageService } from '@/service';

export default function Page() {
  const location: any = useLocation();
  const { path } = location.query;
  const [resources, setResources] = useState<IResource[]>([]);
  useEffect(() => {
    path && getPageDetail();
  }, [path]);

  const getPageDetail = async () => {
    const [err, data] = await PageService.getDetailByPath(path);
    if (!err) {
      const { resourceList } = data;
      setResources(resourceList);
    }
  };

  const DComponent = ({ source, type }: any) => {
    const DC = require(`@/atomComponents/${type}`).default;
    return <DC {...source} />;
  };

  return (
    <ContentWrapper>
      {resources.map((item) => {
        const {
          configObj,
          atom: { type },
        } = item;
        return <DComponent key={1} source={configObj} type={type} />;
      })}
    </ContentWrapper>
  );
}
