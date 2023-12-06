import { useState } from "react";
import "./UsersList.css";

const UsersList =()=> {

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        userType: ''
    });
    
    const [users, setUsers] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState(users);

    const [selectedType, setSelectedType] = useState("all");


    const getFormData = (e) => {
        const target = e.target;
        const name = target.name;
        setFormData((prevData)=>{
            return { ...prevData, [name]: target.value }
        });
    };

    const setUser = (e) => {
        e.preventDefault();
        setUsers(users.concat({...formData, id: Date.now()}));
    }
    


    const filterUsersByType = (userType) => {
        if (userType === 'all') {
            setFilteredUsers(users);
        }
        else {
            const filtered = users.filter((user)=> user.userType === userType);
            setFilteredUsers(filtered);
        }
        setSelectedType(userType);
    };


    return (
        <div className="usersList">
            
            <form onSubmit={setUser}>
                <label htmlFor="userName">User Name</label>
                <input type="text" id="userName" name="userName" placeholder="User Name" onChange={getFormData} value={formData.userName}/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" onChange={getFormData} value={formData.email} />
                <label htmlFor='userType'>User Type</label>
                <select name="userType" defaultValue={'Select User Type'} id="userType" onChange={getFormData}>
                    <option value="Select User Type" disabled>Select User Type</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="btnForm">Save</button>
            </form>

            
            <div className="btnPanel">
                <button className={selectedType ==='admin' ? 'active' : ''} onClick={()=>filterUsersByType('admin')} >Show Admins</button>
                <button className={selectedType ==='user' ? 'active' : '' } onClick={()=>filterUsersByType('user')}>Show Users</button>
                <button className={selectedType ==='all' ? 'active' : '' } onClick={()=>filterUsersByType('all')}>Show All</button>
            </div>

            <div className="list">
                {filteredUsers.map((user)=> {
                    return <div className="userItem" key={user.id}>
                    <p>{user.userName}</p>
                    <p>{user.email}</p>
                    <p>{user.userType}</p>
                    </div>
                })}
                
            </div>
        </div>
    );
};

export default UsersList;