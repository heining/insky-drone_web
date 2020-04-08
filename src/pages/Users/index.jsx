import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import { getUser, addUser, updateUser, deleteUser, deleteUsers } from './service';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async fields => {
  const hide = message.loading('正在添加');
  try {
    const res = await addUser(fields)
    console.log(res)
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
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
    await updateUser(fields);
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

const handleRemove = async (fields,actionRef) => {

  const hide = message.loading('正在删除');
  
  try {
    if(Object.prototype.toString.call(fields) === '[object Array]'){
      let _ids = []
      for(let field of fields){
        _ids.push(field.id)
      }
      const ids = _ids.join()
      console.log(ids)
      await deleteUsers(ids)
    }else{
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

const Users = () => {
  const [sorter, setSorter] = useState({});
  const [AddModalVisible, handleAddModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
    },
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
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
            onClick={() => {
              handleUpdateModalVisible(true);
              setUserData(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该用户吗？"
            onConfirm={() => handleRemove(record,actionRef)}
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
        headerTitle="查询设备"
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
            <PlusOutlined /> 添加
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows,actionRef);
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
        request={params => getUser({
          limit: params.pageSize,
          page: params.current,
          sort: params.sorter
        })}
        columns={columns}
        rowSelection={{}}
      />
      <AddUser
        onSubmit={async value => {
          console.log(value)
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
      {userData && Object.keys(userData).length ? (
        <UpdateUser
          onSubmit={async value => {
            console.log(value)
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setUserData({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUserData({});
          }}
          updateModalVisible={updateModalVisible}
          values={userData}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default Users