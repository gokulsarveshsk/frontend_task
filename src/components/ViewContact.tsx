import React, {useEffect, useState} from 'react'
import Table, { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { ContactDetails } from './CreateContact';
import { Modal, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { deleteContact } from '../Redux/contactActions'; 
const {confirm}= Modal;
const ViewContact = () => {
  const navigate = useNavigate();
  const [contactsInfo, setContactsInfo]= useState<ContactDetails[]>([])
  const dispatch = useDispatch(); 
  const [refetch, setRefetch]= useState<boolean>(false);
  useEffect(() => {
    const fetchData = () => {
        try {
            const response = localStorage.getItem('contacts');
            setContactsInfo(response ? JSON.parse(response) : []);
        } catch (error) {
            throw error;
        }
    };

    fetchData();
}, [refetch]);


  const handleEditTask=(record:any)=>{
    navigate('/createcontact', {state:{record}})
  }
  const handleDeleteTask = (record: any) => {
    console.log("handleDeleteTask-record", record);
    confirm({
      title: 'Delete Contact',
      content: 'Are you sure you want to delete the contact?',
      okText: 'Yes',
      okButtonProps: {
        style: {
          width: '80px', backgroundColor: '#000000', color: 'white'
        },
      },
      cancelText: 'No',
      cancelButtonProps: {
        style: {
          width: '80px', backgroundColor: '#000000', color: 'white'
        },
      },
      async onOk() {
        try {
          dispatch(deleteContact(record));
          setRefetch((prev)=>!prev);
        } catch (error) {
          console.log("error", error)
          notification.error({
            message:'error',
            description:'The contact is not deleted. Please try again later'
          })
        }
      },
      onCancel() {
      },
    });
    
  };
  const columns: ColumnsType<any> = [
    {
      title: 'S.No',
      dataIndex: 'slNo',
      key: 'slNo',
      width: '100px', 
      fixed: 'left',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      width: 'max-content', 
      key: 'firstName',
      fixed: 'left',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      width: 'max-content',
      key: 'lastName',
      fixed: 'left',
    },
    {
      title: 'Status',
      width: 'max-content', 
      dataIndex: 'status',
      key: 'status',
      fixed: 'left',
    },
    {
      title: 'Actions',
      width: '120px',
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      render: (_: any, record: any) => (
        <div onClick={(e) => e.stopPropagation()}>
          <EditOutlined
            onClick={() => handleEditTask(record)}
            style={{
              marginRight: '8px',
              cursor: 'pointer',
              color: 'blue',
              fontSize: '20px',
            }}
          />
          <DeleteOutlined
            onClick={() => handleDeleteTask(record)}
            style={{
              cursor: 'pointer',
              color: 'red',
              fontSize: '20px',
            }}
          />
        </div>
      ),
    },  
  ];
  return (
    <div>
      <h1 style={{ textAlign: 'center', color:'#00000', margin:'30px 20px 20px 20px', fontFamily:'poppins' }}>Contact Details</h1>
      <Table
        columns={columns}
        dataSource={contactsInfo}
      />
    </div>
  )
}

export default ViewContact