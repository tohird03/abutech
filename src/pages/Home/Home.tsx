import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { instanceWeather } from "../../api/instance";
import ResponsiveDrawer from "../../components/Sidebar/Sidebar";
import darkImg from "../../assets/imgs/cloude.jpg";
import Card from "../../components/Card/Card";

const Home = () => {
  const [weatherData, setWeatherData] = React.useState({});
  const [city, setCity] = React.useState("tashkent");
  const [activeCity, setActiveCity] = React.useState("");

  useEffect(() => {
    instanceWeather
      .get(`/weather?q=${city}&appid=adb0448b67b2c947cceeb20cbcadff55`)
      .then((res) => {
        setWeatherData(res.data);
        setActiveCity(res.data.name);
      })
      .catch((err) => {
        setActiveCity(err.response.data.message);
        setWeatherData({});
      });
  }, [city]);

  return (
    <div>
      <ResponsiveDrawer setCity={setCity} city={String(activeCity)}>
        <Box
          sx={{
            height: "91.5vh",
            backgroundImage: `url(${darkImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Card data={weatherData} />
        </Box>
      </ResponsiveDrawer>
    </div>
  );
};

export default Home;
