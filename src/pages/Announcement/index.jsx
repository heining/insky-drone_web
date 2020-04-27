import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import AddArticle from './components/AddArticle';
import { getAnnouncement, addAnnouncement, updateAnnouncement, deleteAnnuncement } from './service';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async fields => {
  const hide = message.loading('正在发布');
  try {
    const res = await addAnnouncement(fields)
    console.log(res)
    hide();
    message.success('发布成功');
    return true;
  } catch (error) {
    hide();
    message.error('发布失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在修改');
  console.log(fields)
  try {
    await updateAnnouncement(fields);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (fields, actionRef) => {

  const hide = message.loading('正在删除');

  try {
    await deleteAnnuncement(fields.id);
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

const Announcement = () => {
  const [sorter, setSorter] = useState({});
  const [AddModalVisible, handleAddModalVisible] = useState(false);
  const [announcementData, setAnnouncementData] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '来源',
      dataIndex: 'origin',
    },
    {
      title: '分类',
      dataIndex: 'type',
    },
    {
      title: '发布时间',
      dataIndex: 'posttime',
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
            onClick={() => { }}
          >
            查看
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该公告吗？"
            onConfirm={() => handleRemove(record, actionRef)}
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
        headerTitle="查询公告"
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleAddModalVisible(true)}>
            <PlusOutlined /> 发布
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
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
        request={params => getAnnouncement({
          limit: params.pageSize,
          page: params.current,
          sort: params.sorter
        })}
        columns={columns}
        rowSelection={{}}
      />
      <AddArticle
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleAddModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleAddModalVisible(false)}
        modalVisible={AddModalVisible}
      />
    </PageHeaderWrapper>
  );
};

export default Announcement