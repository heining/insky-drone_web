import React from 'react';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const AddDeviceControl = props => {
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
      title="添加遥控器"
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
          label="遥控器型号"
          name="model"
          rules={[
            {
              required: true,
              message: '请输入遥控器型号！',
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
          label="驾驶员"
          name="driver"
          rules={[
            {
              required: true,
              message: '请输入驾驶员！',
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
          label="接收机"
          name="receiver"
          rules={[
            {
              required: true,
              message: '请输入接收机！',
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

export default AddDeviceControl;
