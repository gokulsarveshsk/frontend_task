import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, notification, Button,
    ConfigProvider,
    Form,
    Typography,
    Radio,
    ThemeConfig,
    } from 'antd';
  import * as yup from 'yup';
  import { ErrorMessage, Formik, FormikHelpers } from "formik";
import '../styles/CreateUser.css';
import '../styles/AddTask.css';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../Redux/contactActions';
import { v4 as uuidv4 } from 'uuid';

  type FieldType={
    firstName: string;
    lastName: string;
    status: string;
  }

  export interface ContactDetails{
    id:string;
    firstName: string;
    lastName: string;
    status: string;

  }

  const config: ThemeConfig = {
    token: {
      colorPrimary: "#000000",
      colorPrimaryBg: "#00000",
    },
  };

const CreateContact = () => {
   const location = useLocation();
   const navigate = useNavigate();
    const { state } = location;
    const record = state && state.record ? state.record : null;
    console.log("record", record);
    const [initialValue, setInitialValue] = useState<ContactDetails>(() => {
      if (record!==null) {
        console.log("record.employees", record.employees);
          return {
              id: record.id,
              firstName: record.firstName,
              lastName: record.lastName,
              status: record.status,
          };
      } else {
          return {
            id: uuidv4(),
            firstName: '',
            lastName: '',
            status: '',
          };
      }
    });
    const dispatch = useDispatch();
    

  const handleFormSubmit = async (values: any, { setSubmitting, resetForm }: FormikHelpers<any>) => {
    try {
      if (record !== null && record.id === values.id) {
        console.log("values.id", record.id, values.id)
        console.log("values-1", values);
        // Update existing contact
        dispatch(updateContact(values));
        notification.success({
          message: 'Form Submitted Successfully',
          description: 'Your contact has been updated successfully.',
        })
        navigate('/viewcontact')
      } else {
        // Create new contact
        const newContact = { ...values, id: uuidv4() };
        // Dispatch action to add contact to Redux store
        dispatch(addContact(newContact));
        // Show success notification
      notification.success({
        message: 'Form Submitted Successfully',
        description: 'Your contact has been added successfully.',
      });
      }
      
      // Reset the form after successful submission
      resetForm();
  
      
    } catch (error) {
      // Show error notification
      notification.error({
        message: 'Form Submission Failed',
        description: 'There was an error submitting the form. Please try again later.',
      });
    }
  };
  
      
      const handleClearForm = (resetForm:any) => {
        resetForm(); 
      };

      const validationSchema = yup.object().shape({
        firstName: yup.string().min(2, 'First Name must be at least 2 characters').required('First Name is Required'),
        lastName: yup.string().required('Last Name is required'), 
        status: yup.string().required('Status is required'),
      });
  return (
    <ConfigProvider theme={config}>
      <div className='createuser-main' style={{overflow:'hidden'}}>
        <div className='header' style={{display:'flex', flexDirection:'column',alignItems : 'center'}}>
          <div>
            <h1>{record?"Edit Contact":"Create Contact"}</h1>
          </div>
          <div>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
              enableReinitialize={true}
            >
            {({
              
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              isSubmitting,
              resetForm
            }) => 
          { console.log("values",values,errors)
            return (  
              <Form name='basic' layout='vertical' autoComplete='off' onFinish={handleSubmit}>
                <div>
                <Form.Item
                  label="First Name"
                  className="label-strong"
                  name="firstName"
                  required
                  style={{ padding: "10px" }}
                  >
                  <Input
                  style={{
                    height: "50px",
                    width: "470px",
                    borderRadius: "4px",
                    margin: "0px",
                  }}
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
                  <div>
                      <Typography.Text
                      type="danger"
                      style={{ wordBreak: "break-word", textAlign: "left" }}
                      >
                      <ErrorMessage name="firstName" /> {/* Display error message if any */}
                      </Typography.Text>
                  </div>
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    className="label-strong"
                    name="lastName"
                    required
                    style={{ padding: "10px" }}
                    >
                    <Input
                    style={{
                      height: "50px",
                      width: "470px",
                      borderRadius: "4px",
                      margin: "0px",
                    }}
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                <div>
                    <Typography.Text
                    type="danger"
                    style={{ wordBreak: "break-word", textAlign: "left" }}
                    >
                    <ErrorMessage name="lastName" /> {/* Display error message if any */}
                    </Typography.Text>
                </div>
                </Form.Item>
                <Form.Item
                  label="Status"
                  className="label-strong"
                  name="status"
                  required
                  style={{ padding: "10px" }}
                >
                  <Radio.Group
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                    name="status"
                  >
                    <Radio value="Active">Active</Radio>
                    <Radio value="Inactive">Inactive</Radio>
                  </Radio.Group>
                  <div>
                      <Typography.Text
                      type="danger"
                      style={{ wordBreak: "break-word", textAlign: "left" }}
                      >
                      <ErrorMessage name="status" /> {/* Display error message if any */}
                      </Typography.Text>
                  </div>
                </Form.Item>
                <div style={{display:'flex', marginLeft:'240px'}}>
                        <Form.Item>
                          <Button
                            htmlType="button"
                            style={{ width: "100px", height: "41px", cursor: 'pointer'}}
                            className="Button"
                            id='cancel-addTask'
                            onClick={() => handleClearForm(resetForm)}
                          >
                            Clear
                          </Button>
                        </Form.Item>
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{ width: "100%", height: "41px" , marginLeft:'10px', cursor: 'pointer'}}
                              className="Button"
                            >
                              {isSubmitting ? 'Saving...' :record?'Save': 'Save Contact'}
                            </Button>
                          </Form.Item>
                        
                      </div>

                </div>

            </Form>
            )}
            }  
            </Formik>
          </div>
          
        </div>
      </div>
    </ConfigProvider>
  )
}

export default CreateContact