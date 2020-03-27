import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import { Scene, PolygonLayer } from '@antv/l7';
import { AMap } from '@antv/l7-maps';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper
    style={{ margin: 0 }}
  >
    <Card>
      <Alert
        message="功能开发中~"
        type="warning"
        showIcon
        banner
        style={{
          margin: -12,
        }}
      />
    </Card>
  </PageHeaderWrapper>
);
