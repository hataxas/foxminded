import React, {useState, useEffect} from 'react';
import { useParams, useOutletContext, Link, Outlet } from "react-router-dom";
import './tabs.css';

const Tabs = () => {
  let params = useParams();
  const [userList] = useOutletContext();
  const user = userList.users.find(user => user.id == params.userId);
  const tabTypes = ['Info', 'Todos', 'Posts'];
  const [active, setActive] = useState(tabTypes[0]);

  useEffect(() => {
    setActive(tabTypes[0]);
  }, [user]);

  return (
    <div>
      <nav className='tabs'>
        {tabTypes.map(type => (
          <Link
            to={type.toLowerCase()}
            key={type}
            onClick={() => setActive(type)}
            className={active === type ? 'active tab' : 'tab'}
          >
            {type}
          </Link>
        ))}
      </nav>
      <Outlet context={[user]}/>
    </div>
  )
}

export default Tabs;
