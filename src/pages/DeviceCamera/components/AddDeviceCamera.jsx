import React from 'react';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const AddDeviceCamera = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="添加摄像头"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="摄像头名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入摄像头名称！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="设备类型"
          name="type"
          rules={[
            {
              required: true,
              message: '请输入设备类型！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="是否支持云台"
          name="ifPTZ"
          rules={[
            {
              required: true,
              message: '请输入是否支持云台！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="流媒体协议"
          name="agreement"
          rules={[
            {
              required: true,
              message: '请输入流媒体协议！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddDeviceCamera;
