import React from 'react';
import { Table, Form } from 'antd';

const ContactList = ({
	form,
	items,
	onChange,
	isLoading,
	mergedColumns,
	EditableCell,
	cancel,
}) => {
	return (
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				columns={mergedColumns}
				rowClassName="editable-row"
				dataSource={items}
				onChange={onChange}
				pagination={{ pageSize: 20, onChange: cancel }}
				rowKey={record => record.id}
				loading={isLoading}
				bordered
			/>
		</Form>
	);
};

export default ContactList;
