import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(res => {
      setActivities(res.data);
    })
  }, [])

  return (
    <div className="App">
      <Header as='h2' 
        icon='users'
       content='Reactivities'
       />

    <List>
      {activities.map((activity: Activity) => {
       return <List.Item key={activity.id}>
          {activity.title}
        </List.Item>
      })}
    </List>

    </div>
  );
}

export default App;
