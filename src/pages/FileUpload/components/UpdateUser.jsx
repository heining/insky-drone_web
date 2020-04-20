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

const UpdateUser = props => {
  const [userVals, setDeviceVals] = useState({
    nickname: props.values.nickname,
    username: props.values.username,
    id: props.values.id,
    phone: props.values.phone,
    password: props.values.password,
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
    setDeviceVals({ ...userVals });
    handleUpdate(userVals);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="nickname"
          label="用户昵称"
          rules={[
            {
              required: true,
              message: '请输入用户昵称！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="username"
          label="账户名"
          rules={[
            {
              required: true,
              message: '请输入账户名！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="phone"
          label="手机号"
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
      title="用户修改"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          nickname: userVals.nickname,
          phone: userVals.phone,
          id: userVals.id,
          username: userVals.username,
          password: userVals.password,
        }}
        onValuesChange={(_, allValues) => setDeviceVals(allValues)}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateUser;
