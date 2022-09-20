import React from 'react';
import { Card } from 'antd';
import dayjs from 'dayjs';

import { ResponsePage } from './useWikipediaData';

interface Props {
  page: ResponsePage
}

const formatDate = (date: string) => {
  const localDate = dayjs(date);
  return localDate.format('YYYY.MM.DD - HH:mm')
}

export const WikiItem: React.FC<Props> = ({
  page,
}) => {
  const renderThumbnail = () => (<img alt={page.description} src={page.thumbnail?.source} />);

  const date = formatDate(page.timestamp);
  const title = page.description
    ? `${page.description} (${date})`
    : date;

  return (
    <Card bordered={false} title={title}>
      <Card.Meta description={
        <>
          {page.thumbnail && (
            <p>{
              page.desktop?.page
              ? (<a href={page.desktop?.page}>{renderThumbnail()}</a>)
              : (renderThumbnail())
            }</p>
          )}
          <p>{page.extract}</p>
        </>
      } />
    </Card>
  )
}
