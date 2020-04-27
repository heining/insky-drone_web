import React from 'react';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const AddUserDriver = props => {
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
      title="添加驾驶员"
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
          label="姓名"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入姓名！',
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
          label="性别"
          name="gender"
          rules={[
            {
              required: true,
              message: '请输入性别！',
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
          label="证件类型"
          name="certificateType"
          rules={[
            {
              required: true,
              message: '请输入证件类型！',
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
          label="证件号码"
          name="certificateNo"
          rules={[
            {
              required: true,
              message: '请输入证件号码！',
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
          label="驾照类型"
          name="driveType"
          rules={[
            {
              required: true,
              message: '请输入驾照类型！',
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
          label="驾照编号"
          name="driveNo"
          rules={[
            {
              required: true,
              message: '请输入驾照编号！',
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
          label="手机号码"
          name="phone"
          rules={[
            {
              required: true,
              message: '请输入手机号！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddUserDriver;
