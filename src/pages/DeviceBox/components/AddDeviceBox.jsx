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
      title="添加盒子"
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
          label="盒子型号"
          name="model"
          rules={[
            {
              required: true,
              message: '请输入盒子型号！',
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
          label="SN码"
          name="sn"
          rules={[
            {
              required: true,
              message: '请输入SN码！',
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
          label="挂载设备"
          name="linkdev"
          rules={[
            {
              required: true,
              message: '请输入挂载设备！',
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
          label="生产厂家"
          name="manufacturer"
          rules={[
            {
              required: true,
              message: '请输入生产厂家！',
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
