import { useState } from "react";
import "./UsersList.css";

const UsersList =()=> {
    
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userTypeFilter, setUserTypeFilter] = useState('');


    const handleSave = (e) => {
        e.preventDefault();
        const userName = e.target.elements.userName.value;
        const email = e.target.elements.email.value;
        const userType = e.target.elements.userType.value;
        const id = Date.now();

        setUsers([...users, {userName, email, userType, id}]);
    }


    const handleFilter = (userType) => {
        const filtered = users.filter((user) => user.userType === userType);
        setFilteredUsers(filtered);
        setUserTypeFilter(userType);
    };


    const removeUser = (id) => {
        const filteredById = users.filter(user => user.id !== id);
        setUsers(filteredById);
        setFilteredUsers(filteredById);
    }

    return (
        <div className="usersList">
            
            <form onSubmit={handleSave}>
                <label htmlFor="userName">User Name</label>
                <input type="text" id="userName" name="userName" placeholder="User Name" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email"  />
                <label htmlFor='userType'>User Type</label>
                <select name="userType" defaultValue={'Select User Type'} id="userType" >
                    <option value="Select User Type" hidden disabled>Select User Type</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="btnForm">Save</button>
            </form>

            
            <div className="btnPanel">
                <button onClick={()=>handleFilter('admin')} >Show Admins</button>
                <button onClick={()=>handleFilter('user')}>Show Users</button>
                <button onClick={()=>handleFilter('')}>Show All</button>
            </div>

            <div className="list">
                {userTypeFilter ? filteredUsers.map((user, id)=> {
                    return <div className="userItem" key={user.id} onClick={()=>removeUser(user.id)}>
                    <p>{user.userName}</p>
                    <p>{user.email}</p>
                    <p>{user.userType}</p>
                    </div>
                }) : users.map((user, id) => {
                    return <div className="userItem" key={user.id} onClick={()=>removeUser(user.id)}>
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