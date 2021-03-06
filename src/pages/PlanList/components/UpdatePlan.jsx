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

const UpdateDevice = props => {
  const [deviceVals, setDeviceVals] = useState({
    name: props.values.name,
    code: props.values.code,
    id: props.values.id,
    type: props.values.type,
    model: props.values.model,
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
    setDeviceVals({ ...deviceVals });
    handleUpdate(deviceVals);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="设备昵称"
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
          name="code"
          label="设备编号"
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
          name="type"
          label="设备型号"
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
          name="model"
          label="机型"
          rules={[
            {
              required: true,
              message: '请输入机型！',
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
      title="设备修改"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: deviceVals.name,
          code: deviceVals.code,
          id: deviceVals.id,
          type: deviceVals.type,
          model: deviceVals.model,
        }}
        onValuesChange={(_, allValues) => setDeviceVals(allValues)}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateDevice;
