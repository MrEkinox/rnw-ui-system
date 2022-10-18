import { Typography } from "../Typography";
import moment from "moment";
import React, { useState } from "react";
import { View } from "react-native";
import { Card } from "../Card";
import { Calendar } from "./index";
import { CardContent } from "../Card/CardContent";

export default {
  component: Calendar,
  title: "Calendar",
};

export const Base = () => (
  <View style={{ width: 500, padding: 50 }}>
    <Card>
      <CardContent>
        <Calendar interactive onSingleChange={() => {}} />
      </CardContent>
    </Card>
  </View>
);

export const MaxDate = () => (
  <View style={{ width: 500, padding: 50 }}>
    <Card>
      <CardContent>
        <Calendar
          interactive
          onSingleChange={() => {}}
          maxDate={moment().add(2, "days").toDate()}
          minDate={moment().subtract(2, "days").toDate()}
        />
      </CardContent>
    </Card>
  </View>
);

export const Range = () => {
  const [startDate, setStartDate] = useState(
    moment().subtract(2, "days").toDate()
  );
  const [endDate, setEndDate] = useState(moment().add(2, "days").toDate());

  return (
    <View style={{ width: 500, padding: 50 }}>
      <Card>
        <CardContent>
          <Typography>Start : {moment(startDate).format("LLLL")}</Typography>
          <Typography>End : {moment(endDate).format("LLLL")}</Typography>
          <Calendar
            interactive
            mode="range"
            onRangeChange={(newStartDate, newEndDate) => {
              setStartDate(newStartDate);
              setEndDate(newEndDate);
            }}
            startDate={startDate}
            endDate={endDate}
          />
        </CardContent>
      </Card>
    </View>
  );
};

export const Color = () => (
  <View style={{ width: 500, padding: 50 }}>
    <Card>
      <CardContent>
        <Calendar
          interactive
          mode="range"
          color="secondary"
          onSingleChange={() => {}}
          startDate={new Date("1990")}
          endDate={new Date("2023")}
        />
      </CardContent>
    </Card>
  </View>
);

export const Disabled = () => (
  <View style={{ width: 500, padding: 50 }}>
    <Card>
      <CardContent>
        <Calendar
          interactive
          disabled
          mode="range"
          color="secondary"
          onSingleChange={() => {}}
          startDate={new Date("1990")}
          endDate={new Date("2023")}
        />
      </CardContent>
    </Card>
  </View>
);
