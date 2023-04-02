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
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that
              don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
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
