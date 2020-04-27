import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import AddPlan from './components/AddPlan';
import UpdatePlan from './components/UpdatePlan';
import { getPlans, addPlan, updatePlan, deletePlan } from './service';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async fields => {
  const hide = message.loading('正在添加');
  try {
    const res = await addPlan(fields)
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
    await updatePlan(fields);
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
    await deletePlan(fields.id);
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

const PlanList = () => {
  const [sorter, setSorter] = useState({});
  const [AddModalVisible, handleAddModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [planData, setPlanData] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '计划名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createtime',
    },
    {
      title: '申请时间',
      dataIndex: 'applytime',
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
      title: '审核时间',
      dataIndex: 'checktime',
    },
    {
      title: '执行时间',
      dataIndex: 'finishtime',
    },
    {
      title: '飞行类型',
      dataIndex: 'flytype',
    },
    {
      title: '飞行性质',
      dataIndex: 'flytarget',
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
          <a
            onClick={() => { }}
          >
            导出航线
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该计划吗？"
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
        headerTitle="查询计划"
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Link to='/flightplan/planapplication/planapply'>
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
        request={params => getPlans({
          limit: params.pageSize,
          page: params.current,
          sort: params.sorter
        })}
        columns={columns}
        rowSelection={{}}
      />
      <AddPlan
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
      {planData && Object.keys(planData).length ? (
        <UpdatePlan
          onSubmit={async value => {
            console.log(value)
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setPlanData({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setPlanData({});
          }}
          updateModalVisible={updateModalVisible}
          values={planData}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default PlanList