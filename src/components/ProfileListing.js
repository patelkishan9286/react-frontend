import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";

function stringToColor(string) {
  var hash = 0;
  var i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = "#";
  for (i = 0; i < 3; i += 1) {
    var value = (hash >> (i * 8)) & 0xff;
    value = Math.floor(value * 0.7); // limit the color intensity to create a "softer" color
    color += "00".concat(value.toString(16)).slice(-2);
  }
  return color;
}

export default function ProfileListing() {
  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  function applyFilter(e) {
    var tempArr = arr.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setArr2(tempArr);
    setFilterValue(e.target.value);
  }

  useEffect(() => {
    const url = "https://express-t4.onrender.com/api/users";
    axios
      .get(url)
      .then((res) => {
        for (const item of res.data) {
          setArr((prev) => [...prev, item]);
        }
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Filter"
          variant="outlined"
          sx={{ margin: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltTwoToneIcon />
              </InputAdornment>
            ),
          }}
          value={filterValue}
          onChange={applyFilter}
        />
      </Container>
      <Grid container spacing={2} columnSpacing={2}>
        {
          filterValue
            ? arr2.map((item) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={item?._id}>
                    <Card>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: stringToColor(item?.name) }}>
                            {item?.name[0]}
                          </Avatar>
                        }
                        title={item?.name}
                        subheader={
                          item?.gender.charAt(0).toUpperCase() +
                          item?.gender.slice(1)
                        }
                      />
                      <CardContent>
                        <CardMedia
                          component="img"
                          alt="Profile Picture"
                          height="140"
                          image={item?.picture}
                        />
                        <List>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <BusinessIcon />
                              </ListItemIcon>
                              <ListItemText primary={item?.company} />
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <LocationOnIcon />
                              </ListItemIcon>
                              <ListItemText primary={item?.address} />
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <PersonIcon />
                              </ListItemIcon>
                              <ListItemText primary={item?.age} />
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <RestaurantIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  item?.favoriteFruit.charAt(0).toUpperCase() +
                                  item?.favoriteFruit.slice(1)
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </CardContent>
                      <CardActions disableSpacing>
                        <Typography variant="body2">
                          {moment(item?.registered.split(" ")[0]).fromNow()}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ marginLeft: "auto" }}
                          onClick={() =>
                            navigate("/profilesinfo", {
                              state: { id: item._id },
                            })
                          }
                        >
                          View More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
            : arr.map((item) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={item?._id}>
                    <Card>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: stringToColor(item?.name) }}>
                            {item?.name[0]}
                          </Avatar>
                        }
                        title={item?.name}
                        subheader={
                          item?.gender.charAt(0).toUpperCase() +
                          item?.gender.slice(1)
                        }
                      />

                      <CardContent>
                        <CardMedia
                          component="img"
                          alt="Profile Picture"
                          height="140"
                          image={item?.picture}
                        />
                        <List>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <BusinessIcon />
                              </ListItemIcon>
                              <ListItemText primary={item?.company} />
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <LocationOnIcon />
                              </ListItemIcon>
                              <ListItemText primary={item?.address} />
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <PersonIcon />
                              </ListItemIcon>
                              <ListItemText primary={item?.age} />
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <RestaurantIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  item?.favoriteFruit.charAt(0).toUpperCase() +
                                  item?.favoriteFruit.slice(1)
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </CardContent>
                      <CardActions disableSpacing>
                        <Typography variant="body2">
                          {moment(item?.registered.split(" ")[0]).fromNow()}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ marginLeft: "auto" }}
                          onClick={() =>
                            navigate("/profilesinfo", {
                              state: { id: item._id },
                            })
                          }
                        >
                          View More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
          // {arr2.map((item) => {
          //   return (
          //     <Grid item xs={12} sm={6} md={4} lg={4} key={item?._id}>
          //       <Card>
          //         <CardHeader
          //           avatar={
          //             <Avatar sx={{ bgcolor: stringToColor(item?.name) }}>
          //               {item?.name[0]}
          //             </Avatar>
          //           }
          //           title={item?.name}
          //           subheader={
          //             item?.gender.charAt(0).toUpperCase() + item?.gender.slice(1)
          //           }
          //         />
          //         <CardContent>
          //           <List>
          //             <ListItem disablePadding>
          //               <ListItemButton>
          //                 <ListItemIcon>
          //                   <BusinessIcon />
          //                 </ListItemIcon>
          //                 <ListItemText primary={item?.company} />
          //               </ListItemButton>
          //             </ListItem>
          //             <ListItem disablePadding>
          //               <ListItemButton>
          //                 <ListItemIcon>
          //                   <LocationOnIcon />
          //                 </ListItemIcon>
          //                 <ListItemText primary={item?.address} />
          //               </ListItemButton>
          //             </ListItem>
          //             <ListItem disablePadding>
          //               <ListItemButton>
          //                 <ListItemIcon>
          //                   <PersonIcon />
          //                 </ListItemIcon>
          //                 <ListItemText primary={item?.age} />
          //               </ListItemButton>
          //             </ListItem>
          //             <ListItem disablePadding>
          //               <ListItemButton>
          //                 <ListItemIcon>
          //                   <RestaurantIcon />
          //                 </ListItemIcon>
          //                 <ListItemText
          //                   primary={
          //                     item?.favoriteFruit.charAt(0).toUpperCase() +
          //                     item?.favoriteFruit.slice(1)
          //                   }
          //                 />
          //               </ListItemButton>
          //             </ListItem>
          //           </List>
          //         </CardContent>
          //         <CardActions disableSpacing>
          //           <Typography variant="body2">
          //             {moment(item?.registered.split(" ")[0]).fromNow()}
          //           </Typography>
          //           <Button
          //             variant="outlined"
          //             color="primary"
          //             sx={{ marginLeft: "auto" }}
          //             onClick={() =>
          //               navigate("/profilesinfo", { state: { id: item._id } })
          //             }
          //           >
          //             View More
          //           </Button>
          //         </CardActions>
          //       </Card>
          //     </Grid>
          //   );
          // })}
        }
      </Grid>
    </>
  );
}
