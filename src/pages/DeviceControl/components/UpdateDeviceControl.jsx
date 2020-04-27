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

const UpdateDeviceControl = props => {
  const [deviceControlVals, setDeviceControlVals] = useState({
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
    setDeviceControlVals({ ...deviceControlVals });
    handleUpdate(deviceControlVals);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
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
      title="遥控器修改"
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
        onValuesChange={(_, allValues) => setDeviceControlVals(allValues)}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateDeviceControl;
