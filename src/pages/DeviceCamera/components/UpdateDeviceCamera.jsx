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

const UpdateDeviceCamera = props => {
  const [deviceCameraVals, setDeviceCameraVals] = useState({
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
    setDeviceCameraVals({ ...deviceCameraVals });
    handleUpdate(deviceCameraVals);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
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
      title="摄像头修改"
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
        onValuesChange={(_, allValues) => setDeviceCameraVals(allValues)}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateDeviceCamera;
