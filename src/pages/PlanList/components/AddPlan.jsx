import React from 'react';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const AddDevice = props => {
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
      title="添加设备"
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
          label="设备昵称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入设备昵称！',
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
          label="设备编号"
          name="code"
          rules={[
            {
              required: true,
              message: '请输入设备编号！',
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
          label="设备型号"
          name="type"
          rules={[
            {
              required: true,
              message: '请输入设备型号！',
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
          label="机型"
          name="model"
          rules={[
            {
              required: true,
              message: '请输入机型！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddDevice;
