import React, { PropsWithChildren } from 'react';
import { Button, Layout, Spin, Card } from 'antd';
import dayjs from 'dayjs';

import { ErrorModal } from './ErrorModal';
import { WikiItem } from './WikiItem';
import { LOADING_STATUS, ResponsePage, useWikipediaData } from './useWikipediaData';
import { WikiMenu } from './WikiMenu';

const { Content } = Layout;

const pageSorter = (a:ResponsePage, b: ResponsePage) => dayjs(b.timestamp).diff(dayjs(a.timestamp));

export const WikiLayout: React.FC<PropsWithChildren> = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const onError = () => setIsModalOpen(true);
  const { data, status, sync } = useWikipediaData({ onError });
  const [activeCategory, setActiveCategory] = React.useState<string>('');
  const keys = Object.keys(data || {});

  React.useEffect(() => {
    if (keys.length) {
      setActiveCategory(keys[0]);
    }
  }, [keys.join('')]);

  const renderMenu = () => (status === LOADING_STATUS.SUCCESS && (
    <WikiMenu
      items={keys}
      setActive={setActiveCategory}
      activeKey={activeCategory}
    />
  ));

  const sortedItems: ResponsePage[] = [];

  ((data || {})[activeCategory] || [])
    .forEach((item) => {
      item.pages.forEach(page => {
        sortedItems.push(page)
      })
    });

  const visibleStatuses = [
    LOADING_STATUS.IDLE,
    LOADING_STATUS.LOADING,
  ];

  return (
    <Layout className="layout">
      <ErrorModal isOpen={isModalOpen} close={() => { setIsModalOpen(false)}} />
      {renderMenu()}
      <Content
        style={{
          padding: visibleStatuses.includes(status) ? '50px' : '0 50px',
          textAlign: visibleStatuses.includes(status) ? 'center' : 'unset',
        }}
      >
        {status === LOADING_STATUS.LOADING && (<Spin />)}
        {status === LOADING_STATUS.IDLE && (
          <Button onClick={() => sync()}>Load wikipedia data</Button>
        )}
        {status === LOADING_STATUS.SUCCESS && (
          <div className="site-layout-content" style={{ padding: '20px'}}>
            {sortedItems.sort(pageSorter).map((item, index) => (
              <Card key={`c${index}`} bordered={false}>
                <WikiItem page={item} />
              </Card>
            ))}
          </div>
        )}
      </Content>
    </Layout>
  );
}
