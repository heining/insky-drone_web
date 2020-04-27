import React, { useState } from 'react';
import { message, Row, Col, Button, Form, Input } from 'antd';

const FormItem = Form.Item

message.config({
  top: 100
})

const PlanPanel = props => {
  return (
    <div
      style={{ ...props.style, backgroundColor: '#fff', borderRadius: 8, height: 300 }}
      onClick={() => {
        //
      }}
    >
      <Row gutter={[0, 20]} style={{ backgroundColor: '#e6f7ff', marginTop: 0 }}>
        <Col span={23} style={{ marginLeft: 20 }}>计划申请</Col>
      </Row>
      <Form labelCol={{ span: 4 }} colon>
        <Row style={{ marginTop: 30 }} justify='center'>
          <Col span={7}>
            <FormItem label="计划名称" name="planname"><Input defaultValue='电力巡检' /></FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="开始时间" name="starttime"><Input defaultValue='2020-04-28 12:00:00' /></FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="结束时间" name="endtime"><Input defaultValue='2020-04-28 23:00:00' /></FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="飞行员" name="driver"><Input defaultValue='王红' /></FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="飞行器" name="device"><Input defaultValue='inskylab' /></FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="飞行性质" name="flytarget"><Input defaultValue='巡检' /></FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="飞行类型" name="flytype"><Input defaultValue='自由飞' /></FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="报批类型" name="plantype"><Input defaultValue='报批' /></FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="报批单位" name="plangov"><Input defaultValue='运营商' /></FormItem>
          </Col>
        </Row>
        <Row gutter={[0, 10]}>
          <Col span={2} offset={18}>
            <Button
              type="primary"
              onClick={() => {
                const key = 'save'
                message.loading({ content: '区域保存中', key });
                setTimeout(() => {
                  message.success({ content: '区域已保存', key, duration: 2 });
                }, 1000);
              }}
            >保存区域</Button>
          </Col>
          <Col span={2}>
            <Button
              type="primary"
              onClick={() => {
                const key = 'save'
                message.loading({ content: '计划保存中', key });
                setTimeout(() => {
                  message.success({ content: '计划已保存', key, duration: 2 });
                }, 1000);
              }}
            >保存计划</Button>
          </Col>
          <Col span={2}>
            <Button
              type="primary"
              onClick={() => {
                const key = 'send'
                message.loading({ content: '计划提交中', key });
                setTimeout(() => {
                  message.success({ content: '计划已提交', key, duration: 2 });
                }, 1000);
              }}
            >提交计划</Button>
          </Col>
        </Row>
        <Row>
          <Col span={23} style={{ marginLeft: 20 }}>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PlanPanel;