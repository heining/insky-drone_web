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
  const [deviceBoxVals, setDeviceBoxVals] = useState({
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
    setDeviceBoxVals({ ...deviceBoxVals });
    handleUpdate(deviceBoxVals);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="model"
          label="盒子型号"
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
          name="sn"
          label="SN码"
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
          name="linkdev"
          label="挂载设备"
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
          name="manufacturer"
          label="生产厂家"
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
      title="盒子修改"
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
        onValuesChange={(_, allValues) => setDeviceBoxVals(allValues)}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateDevice;
