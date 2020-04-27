import React from 'react';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const AddArticle = props => {
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
      centered
      title="添加公告"
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
          label="标题"
          name="title"
          rules={[
            {
              required: true,
              message: '请输入公告标题！',
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
          label="公告内容"
          name="content"
          rules={[
            {
              required: true,
              message: '请输入公告内容！',
            },
          ]}
        >
          <Input.TextArea placeholder="请输入" autoSize={{ minRows: 5, maxRows: 8 }} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddArticle;
