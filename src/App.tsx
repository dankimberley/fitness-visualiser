import "./App.css";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getWeek, getYear } from "date-fns";

type Activity = {
  id: number;
  date: string;
  type: string;
  distance: number;
  duration: number;
  elevation_gain: number;
  week: string;
};

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/activities")
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const discipline: string = "Run";

  const getChartData = (activities: Activity[], range: number = 8) => {
    const currentDate = new Date();
    const currentWeek = `${getYear(currentDate)}-${getWeek(currentDate)}`;
    let earliestWeek: string;
    if (Number(currentWeek.split("-")[1]) > range) {
      earliestWeek = `${getYear(currentDate)}-${getWeek(currentDate) - range + 1}`;
    } else {
      earliestWeek = `${getYear(currentDate)}-${getWeek(currentDate) - range + 1}`;
    }
    console.log(earliestWeek);
    console.log(currentWeek);
    return activities
      .filter((activity) => activity.week.split("-")[0] == "2025")
      .filter((activity) => activity.type == discipline)
      .map((activity) => ({
        date: activity.date,
        distance: Number(activity.distance) / 1000,
      }));
  };

  return (
    <>
      <div>
        <h1>Fitness tracker</h1>
        <div style={{ marginBottom: "20px" }}>
          <label>
            <input type="checkbox" defaultChecked /> Ride
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input type="checkbox" /> Run
          </label>
        </div>
        {/* <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.date} - {activity.type} - {activity.distance}m
            </li>
          ))}
        </ul> */}
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
