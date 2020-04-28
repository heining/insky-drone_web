import React from 'react';
import { Form, Modal, Row, Col } from 'antd';

const ViewArticle = props => {
  const { modalVisible, onOk, values } = props;

  return (
    <Modal
      destroyOnClose
      centered
      title="公告详情"
      visible={modalVisible}
      footer={null}
      onOk={() => onOk()}
      onCancel={() => onOk()}
    >
      <Row justify='center' align='middle'>
        <Col span={12} style={{ textAlign: 'center', fontSize: 16, fontWeight: '600' }}>{values.title}</Col>
      </Row>
      <Row justify='space-between' gutter={[0, 20]}>
        <Col span={10}>发布单位：{values.origin}</Col>
        <Col span={10}>发布时间：{values.posttime}</Col>
      </Row>
      <Row>
        <Col span={24}>{values.content}</Col>
      </Row>
    </Modal>
  );
};

export default ViewArticle;
