import "./App.css";
import { useEffect, useState } from "react";

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
      distance: activity.distance
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
              {activity.date} - {activity.type} - {activity.distance}km
            </li>
          ))}
        </ul>
        <p>{JSON.stringify(getChartData(activities))}</p>
      </div>
    </>
  );
}

export default App;
