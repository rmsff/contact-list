import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Input, Button, Form, InputNumber, Popconfirm, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { contactAction } from 'store/actions';
import { ContactList } from 'components';

const mapStateToProps = ({
	setContacts,
	editContact,
	removeContact,
	contacts: { items, isLoading, isSubmiting },
}) => ({
	items,
	isLoading,
	isSubmiting,
	setContacts,
	editContact,
	removeContact,
});

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const ContactListContainer = ({
	items,
	isLoading,
	isSubmiting,
	setContacts,
	editContact,
	removeContact,
}) => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const [sortedInfo, setSortedInfo] = useState({});
	const [editingKey, setEditingKey] = useState('');
	const [deletingKey, setDeletingKey] = useState('');

	const [form] = Form.useForm();

	const isEditing = record => {
		return record.id === editingKey;
	};
	const edit = record => {
		form.setFieldsValue({ ...record });
		setEditingKey(record.id);
	};
	const cancel = () => setEditingKey('');
	const handleSave = async id => {
		try {
			const row = await form.validateFields();
			const newContacts = [...items];
			const index = newContacts.findIndex(item => id === item.id);

			if (index > -1) {
				const item = newContacts[index];
				newContacts.splice(index, 1, { ...item, ...row });
				const newItem = newContacts[index];
				editContact({ newItem, newContacts, setEditingKey });
			} else {
				newContacts.push(row);
				setContacts(newContacts);
				setEditingKey('');
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};
	const handleDelete = id => {
		const newContacts = items.filter(item => item.id !== id);
		removeContact({ id, newContacts, setDeletingKey });
	};
	const handleChange = (_pagination, _filters, sorter) => setSortedInfo(sorter);
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = clearFilters => {
		clearFilters();
		setSearchText('');
	};

	let searchInput = {};
	const getColumnProps = dataIndex => {
		if (dataIndex === 'actions') {
			return {
				dataIndex,
				key: dataIndex,
				render: (_, record) => {
					const editable = isEditing(record);
					return editable ? (
						<Spin spinning={isSubmiting}>
							<div className="actions-block">
								<span>
									<a
										href="javascript"
										onClick={() => handleSave(record.id)}
										style={{ marginRight: 8 }}>
										Save
									</a>
									<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
										<a href="record-pop">Cancel</a>
									</Popconfirm>
								</span>
							</div>
						</Spin>
					) : (
						<Spin spinning={isSubmiting && deletingKey === record.id}>
							<div className="actions-block">
								<a
									href="record-edit"
									disabled={editingKey !== ''}
									onClick={e => {
										edit(record);
										e.preventDefault();
									}}>
									Edit
								</a>
								<Popconfirm
									title="Sure to delete?"
									onConfirm={() => handleDelete(record.id)}>
									<a href="record-delete" disabled={editingKey !== ''}>
										Delete
									</a>
								</Popconfirm>
							</div>
						</Spin>
					);
				},
			};
		}
		const sorterMapping = {
			id: (a, b) => a.id - b.id,
			phone: (a, b) => a.phone.replace(/-|\(|\)/g, '') - b.phone.replace(/-|\(|\)/g, ''),
			[dataIndex !== ('id' || 'phone') && dataIndex]: (a, b) =>
				a[dataIndex].toLowerCase() < b[dataIndex].toLowerCase() ? -1 : 1,
		};
		return {
			dataIndex,
			key: dataIndex,
			editable: true,
			filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
				<div style={{ padding: 8 }}>
					<Input
						ref={node => {
							searchInput = node;
						}}
						placeholder={`Search ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
						onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
						style={{ width: 188, marginBottom: 8, display: 'block' }}
					/>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						size="small"
						style={{ width: 90, marginRight: 8 }}>
						Search
					</Button>
					<Button
						onClick={() => handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}>
						Reset
					</Button>
				</div>
			),
			filterIcon: filtered => (
				<SearchOutlined
					type="search"
					style={{ color: filtered ? '#1890ff' : undefined }}
				/>
			),
			onFilter: (value, record) =>
				record[dataIndex]
					.toString()
					.toLowerCase()
					.includes(value.toLowerCase()),
			onFilterDropdownVisibleChange: visible => {
				if (visible) {
					setTimeout(() => searchInput.select());
				}
			},
			render: text =>
				searchedColumn === dataIndex ? (
					<Highlighter
						highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
						searchWords={[searchText]}
						autoEscape
						textToHighlight={text.toString()}
					/>
				) : (
					text
				),
			sortOrder: sortedInfo.columnKey === dataIndex && sortedInfo.order,
			sorter: sorterMapping[dataIndex],
		};
	};

	const columns = [
		{
			title: 'firstName',
			width: '16%',
			...getColumnProps('firstName'),
		},
		{
			title: 'lastName',
			width: '16%',
			...getColumnProps('lastName'),
		},
		{
			title: 'email',
			width: '20%',
			...getColumnProps('email'),
		},
		{
			title: 'phone',
			width: '19%',
			...getColumnProps('phone'),
		},
		{
			title: 'address',
			width: '19%',
			...getColumnProps('address'),
		},
		{
			title: 'actions',
			width: '18%',
			...getColumnProps('actions'),
		},
	];

	const mergedColumns = columns.map(col => {
		if (!col.editable) return col;
		return {
			...col,
			onCell: record => ({
				record,
				inputType: col.dataIndex === 'number' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	return (
		<ContactList
			form={form}
			items={items}
			onChange={handleChange}
			isLoading={isLoading}
			mergedColumns={mergedColumns}
			EditableCell={EditableCell}
			cancel={cancel}
		/>
	);
};

export default connect(mapStateToProps, contactAction)(ContactListContainer);
