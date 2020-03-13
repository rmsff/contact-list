import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { contactAction } from 'store/actions';
import { ContactList } from 'components';

const mapStateToProps = ({ contacts: { items, isLoading }, fetchContacts }) => ({
	items,
	isLoading,
	fetchContacts,
});

const ContactListContainer = ({ items, isLoading, fetchContacts }) => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const [sortedInfo, setSortedInfo] = useState({});

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
		const sorterMapping = {
			id: (a, b) => a.id - b.id,
			phone: (a, b) => a.phone.replace(/-|\(|\)/g, '') - b.phone.replace(/-|\(|\)/g, ''),
			[dataIndex !== ('id' || 'phone') && dataIndex]: (a, b) =>
				a[dataIndex].toLowerCase() < b[dataIndex].toLowerCase() ? -1 : 1,
		};
		return {
			dataIndex,
			key: dataIndex,
			ellipsis: true,
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
						icon="search"
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
			width: '21%',
			...getColumnProps('email'),
		},
		{
			title: 'phone',
			width: '20%',
			...getColumnProps('phone'),
		},
		{
			title: 'address',
			width: '20%',
			...getColumnProps('address'),
		},
	];

	return (
		<ContactList
			columns={columns}
			items={items}
			setSortedInfo={setSortedInfo}
			onChange={handleChange}
			isLoading={isLoading}
		/>
	);
};

export default connect(mapStateToProps, contactAction)(ContactListContainer);
