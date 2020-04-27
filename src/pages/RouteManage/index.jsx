import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import AddRoute from './components/AddRoute';
import UpdateRoute from './components/UpdateRoute';
import { getRoutes, addRoute, updateRoute, deleteRoute } from './service';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async fields => {
  const hide = message.loading('正在添加');
  try {
    const res = await addRoute(fields)
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
    await updateRoute(fields);
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
    await deleteRoute(fields.id);
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

const RouteManage = () => {
  const [sorter, setSorter] = useState({});
  const [AddModalVisible, handleAddModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [routeData, setRouteData] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '航线名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createtime',
    },
    {
      title: '航线长度',
      dataIndex: 'linelength',
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
      title: '航点个数',
      dataIndex: 'pointNum',
    },
    {
      title: '飞行次数',
      dataIndex: 'times',
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
          <a
            onClick={() => { }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => { }}
          >
            导出
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该航线吗？"
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
        headerTitle="查询航线"
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Link to='/flightplan/command/routeplan'>
            <Button type="primary">
              <PlusOutlined /> 添加
            </Button>
          </Link>,
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
        request={params => getRoutes({
          limit: params.pageSize,
          page: params.current,
          sort: params.sorter
        })}
        columns={columns}
        rowSelection={{}}
      />
      <AddRoute
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
      {routeData && Object.keys(routeData).length ? (
        <UpdateRoute
          onSubmit={async value => {
            console.log(value)
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setRouteData({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setRouteData({});
          }}
          updateModalVisible={updateModalVisible}
          values={routeData}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default RouteManage