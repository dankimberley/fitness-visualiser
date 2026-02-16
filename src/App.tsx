import "./App.css";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

type Activity = {
  id: number;
  date: string;
  type: string;
  distance: number;
  duration: number;
  elevation_gain: number;
  average_heart_rate: number;
  average_speed: number;
};

function App() {
  const [message, setMessage] = useState<string>("");
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/activities")
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const getChartData = (activities: Activity[]) => {
    return activities.map(activity => ({
      date: activity.date,
      distance: Number(activity.distance) / 1000
    }))
  }

  return (
    <>
      <div>
        <h1>Fitness tracker</h1>
        <p>{message}</p>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.date} - {activity.type} - {activity.distance}m
            </li>
          ))}
        </ul>
        <BarChart width={600} height={300} data={getChartData(activities)}>
          <CartesianGrid />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="distance" fill="#8884d8" />
        </BarChart>
      </div>
    </>
  );
}

export default App;
