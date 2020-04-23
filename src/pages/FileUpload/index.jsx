import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { toShowtime } from '@/utils/utils';
import ProTable from '@ant-design/pro-table';
import AddFile from './components/AddFile';
import { deleteUser, deleteUsers, getFiles, uploadFile } from './service';

/**
 * 上传文件
 * @param fields
 */
const handleUpload = async file => {
  const hide = message.loading('正在上传');
  try {
    const res = await uploadFile(file)
    console.log(res)
    hide();
    if (res.message === '文件上传成功') {
      message.success('上传成功');
      return true;
    } else {
      message.error('上传失败请重试！');
      return false;
    }
  } catch (error) {
    hide();
    message.error('上传失败请重试！');
    return false;
  }
};

/**
 *  删除文件
 * @param selectedRows
 */
const handleRemove = async (fields, actionRef) => {

  const hide = message.loading('正在删除');

  try {
    if (Object.prototype.toString.call(fields) === '[object Array]') {
      let _ids = []
      for (let field of fields) {
        _ids.push(field.id)
      }
      const ids = _ids.join()
      console.log(ids)
      await deleteUsers(ids)
    } else {
      await deleteUser(fields.id);
    }
    hide();
    message.success('删除成功');
    if (actionRef.current) {
      actionRef.current.reload();
    }
    return true;
  } catch (error) {
    console.log(error)
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const FileUpload = () => {
  const [sorter, setSorter] = useState({});
  const [uploadModalVisible, handleUploadModalVisible] = useState(false);
  const actionRef = useRef();
  const columns = [
    {
      title: '文件ID',
      dataIndex: 'id',
    },
    {
      title: '文件名',
      dataIndex: 'name',
    },
    {
      title: '文件大小',
      dataIndex: 'size',
    },
    {
      title: '文件类型',
      dataIndex: 'type',
    },
    {
      title: '上传时间',
      dataIndex: 'showTime',
      // valueEnum: {
      //   0: {
      //     text: '关闭',
      //     status: 'Default',
      //   },
      //   1: {
      //     text: '运行中',
      //     status: 'Processing',
      //   },
      //   2: {
      //     text: '已上线',
      //     status: 'Success',
      //   },
      //   3: {
      //     text: '异常',
      //     status: 'Error',
      //   },
      // },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            href={record.url}
            // onClick={() => {
            //   console.log(record)
            // }}
            download
          >
            下载
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该文件吗？"
            onConfirm={() => { }}
            okText="确认"
            cancelText="取消"
          >
            <a href="">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper
      style={{ margin: 0 }}
    >
      <ProTable
        headerTitle="查询文件"
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleUploadModalVisible(true)}>
            <PlusOutlined /> 上传
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows, actionRef);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  {/* <Menu.Item key="approval">批量审批</Menu.Item> */}
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
            {/* <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span> */}
          </div>
        )}
        request={params => getFiles({
          limit: params.pageSize,
          page: params.current,
          sort: params.sorter
        })}
        postData={data => {
          for (let i of data) {
            i['type'] = i.name.split('.')[1]
            i['showTime'] = toShowtime(i.uploadTime)
          }
          return data
        }}
        columns={columns}
        rowSelection={{}}
      />
      <AddFile
        onSubmit={async file => {
          console.log(file)
          const res = await handleUpload(file);
          if (res) {
            handleUploadModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleUploadModalVisible(false)}
        modalVisible={uploadModalVisible}
      />
    </PageHeaderWrapper>
  );
};

export default FileUpload