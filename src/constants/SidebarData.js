import { MdOutlineManageAccounts, MdOutlineSettings } from "react-icons/md";
import { FaUserInjured } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";


const SuperadminSettingData = [
    {
        id: 1,
        name: 'Account',
        pathname: "accounts",
        icon: <MdOutlineManageAccounts color={"white"} size={18} />,
        child: [
            {
                name: 'List',
                pathname: 'list',
                option: '?page=1&limit=20'
            },
            {
                name: 'Form',
                pathname: 'form',
                option: '?section=create'
            }
        ]
    },
    {
        id: 2,
        name: 'List Of Value',
        pathname: "list-of-values",
        icon: <MdOutlineSettings color={"white"} size={18} />,
        child: [
            {
                name: 'List',
                pathname: 'list',
                option: '?page=1&limit=20'
            },
            {
                name: 'Form',
                pathname: 'form',
                option: '?section=create'
            }
        ]
    },
]

const SuperadminData = [
    {
        id: 1,
        name: 'Patient',
        pathname: "patients",
        icon: <FaUserInjured size={18} />,
        child: [
            {
                name: 'List',
                pathname: 'list',
                option: '?page=1&limit=20'
            },
            {
                name: 'Form',
                pathname: 'form',
                option: '?section=create'
            }
        ]
    },
    {
        id: 2,
        name: 'Doctor',
        pathname: "doctors",
        icon: <FaUserDoctor size={18} />,
        child: [
            {
                name: 'List',
                pathname: 'list',
                option: '?page=1&limit=20'
            },
            {
                name: 'Form',
                pathname: 'form',
                option: '?section=create'
            }
        ]
    },
];

export { 
    SuperadminData,
    SuperadminSettingData,
};