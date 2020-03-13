import React from 'react';
import { Table } from 'antd';

export default ({ columns, items, onChange, isLoading }) => (
	<Table
		columns={columns}
		dataSource={items}
		onChange={onChange}
		pagination={{ pageSize: 20 }}
		rowKey={record => record.id}
		loading={isLoading}
		bordered="true"
	/>
);
