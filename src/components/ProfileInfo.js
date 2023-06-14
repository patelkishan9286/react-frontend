import { Box, Button, CardMedia, Container, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export default function ProfileInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  const [data, setData] = useState({});
  useEffect(() => {
    const url = `https://express-t4.onrender.com/api/users/${id}`;
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elevation={2} sx={{ padding: 5 }}>
            <Button onClick={() => navigate(-1)}>{`< Back`}</Button>

            <Grid item>
              <h2>{data.name}</h2>
            </Grid>
            <Grid item>
              <Paper variant="outlined">
                <CardMedia
                  component="img"
                  alt="Profile Picture"
                  height="140"
                  image={data.picture}
                />
              </Paper>
            </Grid>
            <Grid item>
              <p>
                <b>{data.greeting}</b>
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>Gender:</b>{" "}
                {data?.gender?.charAt(0).toUpperCase() + data?.gender?.slice(1)}
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>Company:</b> {data.company}
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>Email:</b> {data.email}
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>Contact:</b> {data.phone}
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>Address:</b> {data.address}
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>Age:</b> {data.age}
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>Balance:</b> ${data.address}
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>Eye Color:</b>{" "}
                {data?.eyeColor?.charAt(0).toUpperCase() +
                  data?.eyeColor?.slice(1)}
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>Registered On:</b> {data.registered} (
                {moment(data?.registered?.split(" ")[0]).fromNow()})
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>Favourite Fruit:</b>{" "}
                {data?.favoriteFruit?.charAt(0).toUpperCase() +
                  data?.favoriteFruit?.slice(1)}
              </p>
            </Grid>
            <Grid item>
              <p>
                <b>About:</b> {data.about}
              </p>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
