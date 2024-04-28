import React, {useState, useEffect} from "react";
import { Modal,Menu} from "antd";
import { Link, useNavigate,useLocation } from "react-router-dom";
import './styles/Dashboard.css'
import { PoweroffOutlined, HomeFilled, UserAddOutlined, AppstoreAddOutlined, UserOutlined, UsergroupAddOutlined, ScheduleOutlined, PullRequestOutlined, ScheduleFilled } from "@ant-design/icons";

const Sidebar: React.FC = () => {
    const [activeKey, setActiveKey] = useState("");

    const Location = useLocation();

    useEffect(() => {
        // Extract active key from the URL pathname
        console.log("location.pathName", Location.pathname)
        const pathSegments = Location.pathname.split("/");
        setActiveKey(pathSegments[pathSegments.length - 1]);
        console.log("pathsegments", pathSegments[pathSegments.length - 1])
    }, [Location.pathname]);

    const isRequestsActive = activeKey === "approvalrequest" || activeKey === "monthtasks";
    const isEmployeeRequestActive = activeKey === 'calendar' || activeKey === 'dashboard';
    const isAssignTask = activeKey ==='taskassign' || activeKey ==='taskassigntable' || activeKey == 'employeetaskassigndetails'

    return (
        <div>
            <Menu id="side" mode="inline" selectedKeys={[activeKey]}>
            <>
                        <Menu.Item
                            id="menu"
                            key="dashboard"
                            icon={<HomeFilled />}
                            className={activeKey==='dashboard' ? "active" : ""}
                        >
                            <Link to="/">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item
                            id="menu"
                            key="createcontact"
                            icon={<ScheduleOutlined />}
                            className={activeKey === "createcontact" ? "active" : ""}
                        >
                            <Link to="/createcontact">Create Contact</Link>
                        </Menu.Item>
                        {/* <Menu.Item
                            id="menu"
                            key="monthRequest"
                            icon={<ScheduleOutlined />}
                            className={activeKey === "monthRequest" ? "active" : ""}
                        >
                            <Link to="/employee/monthRequest">Month Request</Link>
                        </Menu.Item> */}
                        <Menu.Item
                            id="menu"
                            key="viewcontact"
                            icon={<ScheduleFilled />}
                            className={activeKey==='viewcontact' ? "active" : ""}
                        >
                            <Link to="/viewcontact">View Contact</Link>
                        </Menu.Item>
                    </>
            </Menu>
        </div>
    );
};

export default Sidebar;
