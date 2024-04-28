import React, {useState, useEffect} from 'react'
import { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { Input, TimePicker, Select, notification, DatePicker, Button, Modal, Col,
    ConfigProvider,
    Form,
    Row,
    Typography,
    Radio,
    ThemeConfig,
    message,} from 'antd';
  import * as yup from 'yup';
  import { ErrorMessage, Formik, FormikFormProps, FormikHelpers, Field } from "formik";
import { CatchingPokemonSharp } from '@mui/icons-material';
import '../styles/CreateUser.css';
import '../styles/AddTask.css';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addContact } from '../Redux/contactActions';
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
      colorPrimary: "#0B4266",
      colorPrimaryBg: "#E7ECF0",
    },
  };

const CreateContact = () => {
   // const location = useLocation();
   // const navigate = useNavigate();
    // const { state } = location;
    // const record = state && state.record ? state.record : null;
    // console.log("record", record);
    // const [initialValue, setInitialValue] = useState<ContactDetails>(() => {
    //   if (record!==null) {
    //     console.log("record.employees", record.employees);
    //       return {
    //           firstName: record.firstName,
    //           lastName: record.lastName,
    //           active: record.active,
    //       };
    //   } else {
    //       return {
    //         firstName: '',
    //         lastName: '',
    //         active: '',
    //       };
    //   }
    // });
    const dispatch = useDispatch(); // Get dispatch function from Redux
    const [initialValue, setInitialValue] = useState<ContactDetails>( {
            id:uuidv4(),
            firstName: '',
            lastName: '',
            status: '',
    });
  //console.log("initialValue", initialValue)
    

  const handleFormSubmit = async (values: any, { setSubmitting, resetForm }: FormikHelpers<any>) => {
    try {
        const newContact = { ...values, id: uuidv4() };
        // Dispatch action to add contact to Redux store
        dispatch(addContact(newContact));
        
        // Reset the form after successful submission
        resetForm();

        // Show success notification
        notification.success({
            message: 'Form Submitted Successfully',
            description: 'Your contact has been added successfully.',
        });
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
        firstName: yup.string().required('First Name is Required'),
        lastName: yup.string().required('Last Name is required'), 
        status: yup.string().required('Status is required'),
      });
  return (
    <ConfigProvider theme={config}>
      <div className='createuser-main' style={{overflow:'hidden'}}>
        <div className='header' style={{display:'flex', flexDirection:'column'}}>
          <div>
            <h1>Create Contact</h1>
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
              setFieldValue,
              setFieldTouched,
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
                <div style={{display:'flex', marginLeft:'760px'}}>
                        <Form.Item>
                          <Button
                            //type="primary"
                            htmlType="button"
                            style={{ width: "100px", height: "41px", cursor: 'pointer'}}
                            className="Button"
                            id='cancel-addTask'
                            onClick={() => handleClearForm(resetForm)}
                            //disabled={selectedKeysToHide.includes(values.date)} // Disable if currentDate is in selectedKeysToHide
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
                              //disabled={isSubmitting || selectedKeysToHide.includes(values.date) || Object.keys(errors).length > 0 } // Disable if submitting, date is in selectedKeysToHide, or there are form errors
                              //title={selectedKeysToHide.includes(values.date) ? 'Approved date should not have the access to add the task' :  Object.keys(errors).length > 0 ? 'Kindly fill all the required fields':''}
                            >
                              {isSubmitting ? 'Submitting...' :'Submit'}
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