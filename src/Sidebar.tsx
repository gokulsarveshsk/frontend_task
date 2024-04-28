import React, {useState, useEffect} from "react";
import { Modal,Menu} from "antd";
import { Link, useNavigate,useLocation } from "react-router-dom";
import './styles/Dashboard.css'
import { HomeFilled, DatabaseOutlined, UserAddOutlined } from "@ant-design/icons";

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
                            <Link to="/">Charts and Maps</Link>
                        </Menu.Item>
                        <Menu.Item
                            id="menu"
                            key="createcontact"
                            icon={<UserAddOutlined />}
                            className={activeKey === "createcontact" ? "active" : ""}
                        >
                            <Link to="/createcontact">Create Contact</Link>
                        </Menu.Item>
                        <Menu.Item
                            id="menu"
                            key="viewcontact"
                            icon={<DatabaseOutlined />}
                            className={activeKey==='viewcontact' ? "active" : ""}
                        >
                            <Link to="/viewcontact">Edit Contacts</Link>
                        </Menu.Item>
                    </>
            </Menu>
        </div>
    );
};

export default Sidebar;
