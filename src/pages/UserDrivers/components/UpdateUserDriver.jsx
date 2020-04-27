import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal } from 'antd';
const FormItem = Form.Item;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const UpdateUserDriver = props => {
  const [userDriverVals, setDeviceDriverVals] = useState({
    ...props.values
  });
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    setDeviceDriverVals({ ...userDriverVals });
    handleUpdate(userDriverVals);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
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
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => okHandle()}>
          确认
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="驾驶员修改"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          ...props.values
        }}
        onValuesChange={(_, allValues) => setDeviceDriverVals(allValues)}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateUserDriver;
