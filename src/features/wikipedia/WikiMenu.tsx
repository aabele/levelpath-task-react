import React from 'react';
import { Menu, Layout } from 'antd';

interface Props {
  items: string[];
  activeKey: string;
  setActive(item: string): void;
}

const capFirst = (data: string) => data.charAt(0).toUpperCase() + data.slice(1);

export const WikiMenu: React.FC<Props> = ({
  items,
  activeKey,
  setActive,
}) => (
  <Layout.Header>
    <Menu
      theme="dark"
      mode="horizontal"
      activeKey={activeKey}
      selectedKeys={[activeKey]}
      onClick={(item) => setActive(item.key)}
      items={ items.map((item: string) => ({ key: item, label: capFirst(item)}))}
    />
  </Layout.Header>
)
