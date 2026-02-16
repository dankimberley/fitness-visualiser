import express from "express";
import cors from "cors";
import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { getWeek} from 'date-fns'

type StravaRecord = {
  'Activity ID': string;
  'Activity Date': string;
  'Activity Name': string;
  'Activity Type': string;
  'Activity Description': string;
  'Elapsed Time': string;
  'Distance': string;
  'Moving Time': string;
  'Max Speed': string;
  'Average Speed': string;
  'Elevation Gain': string;
};

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend" });
});

app.get("/api/activities", async (req, res) => {
  try {
    const data = await fs.readFile("./data/activities.csv", "utf-8");
    const activities = parse(data, {
      columns: true,
    }) as StravaRecord[];
    const processed = activities
      .filter(
        (activity: StravaRecord) =>
          activity["Activity Type"] === "Run" ||
          activity["Activity Type"] === "Ride",
      )
      .map((activity: StravaRecord, index: number) => {
        const activityDate = new Date(activity['Activity Date']);
        return {
          id: index + 1,
          date: activityDate.toISOString().split('T')[0],
          week: getWeek(activityDate, { weekStartsOn: 1 }),
          type: activity["Activity Type"],
          distance: parseFloat(activity["Distance"]) || 0,
          duration: parseInt(activity["Moving Time"]) || 0,
        };
      });
    res.json(processed);
  } catch {
    res.status(500).json({ error: "Failed to read activities" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
