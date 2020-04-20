import React from 'react';
import { Form, Input, Modal, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const FormItem = Form.Item;
const { Dragger } = Upload;

const options = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  beforeUpload: (file,fileList) => {
    console.log(file,fileList)
    return false
  }
};

const AddFile = props => {
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
      title="上传文件"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Dragger {...options}>
        <p style={{ color: '#1e78f0', marginBottom: 20 }} >
          <InboxOutlined style={{ fontSize: 48 }} />
        </p>
        <p>单击或将文件拖到该区域以上传</p>
        <p>
          支持单文件或批量上传。
        </p>
      </Dragger>
    </Modal>
  );
};

export default AddFile;
