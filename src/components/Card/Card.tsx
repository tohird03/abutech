import * as React from "react";
import { dataObject } from "../../ts/interface/data.interface";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import {
  styled,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
  red,
  FavoriteIcon,
  ShareIcon,
  ExpandMoreIcon,
  MoreVertIcon,
  Box,
  WarningAmberIcon,
} from "./Card.imported";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props: dataObject) {
  const [expanded, setExpanded] = React.useState(false);
  const { data } = props;
  console.log(data);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (data.name) {
    return (
      <Card
        sx={{
          width: 345,
          margin: "0 auto",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%)`,
        }}
      >
        <CardHeader
          title={data.name}
          subheader={`Lon: ${data?.coord?.lon} Lat ${data?.coord?.lon}`}
        />
        <CardMedia
          component="img"
          height="194"
          width="100"
          image={`http://openweathermap.org/img/wn/${
            data?.weather?.length > 0 ? data?.weather[0]?.icon : ""
          }@2x.png`}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h3" color="text.secondary">
            {Math.floor(data?.main?.temp - 273)}°C
          </Typography>
          <Box>
            <Typography variant="h6" color="text.secondary">
              Wind Speed: {Math.floor(data?.wind?.speed)}m/s
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Wind: {Math.floor(data?.wind?.speed)}m/s
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
          borderRadius: "10px",
          color: "red",
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0,0,30,0.4)",
          width: "400px",
          textAlign: "center",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%)`,
        }}
      >
        <WarningAmberIcon sx={{ fontSize: "40px" }} /> City Not Found
      </Typography>
    );
  }
}
