import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Profile from "./../assets/images/profile.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Run from "./../assets/images/run.png";

function RunOfRunner() {
  const [runnerName, setRunnerName] = useState("");
  const [runnerImage, setRunnerImage] = useState("");
  const [runnerId, setRunnerId] = useState("");
  const [runData, setRunData] = useState([]);

  useEffect(() => {
    //อ่านข้อมูลจาก localStorage
    const runner = JSON.parse(localStorage.getItem("runner"));

    //เอาข้อมูลที่อ่านจาก localStorage ไปกำหนดให้กับ state
    setRunnerName(runner.runnerName);
    setRunnerImage(runner.runnerImage);
    setRunnerId(runner.runnerId);

    //ดึงข้อมูลการวิ่งของนักวิ่งจากฐานข้อมูล
    try {
      const getData = async () => {
        const response = await fetch(
          `http://localhost:3030/run/${runner.runnerId}`,
          {
            method: "GET",
          }
        );

        if (response.status === 200) {
          const result = await response.json();
          console.log(result);
          setRunData(result["data"]);
        }
      };

      getData();
    } catch (error) {
      alert(`พบปัญหาในการทำงาน ลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล : ${error}`);
    }
  }, []);

  // ฟังก์ชั่นลบข้อมูลการวิ่ง
  const handleDeleteRun = async (runId) => {
    if (window.confirm("คุณต้องการลบข้อมูลการวิ่งใช่หรือไม่ ?")) {
      try {
        const response = await fetch(`http://localhost:3030/run/${runId}`, {
          method: "DELETE",
        });

        if (response.status === 200) {
          alert("ลบข้อมูลการวิ่งเรียบร้อยแล้ว");
          setRunData(runData.filter((run) => run.runId !== runId));
          // หรือ
          // window.location.reload();
        } else {
          alert("พบปัญหาในการลบข้อมูล ลองใหม่อีกครั้ง");
        }
      } catch (error) {
        alert(`พบปัญหาในการทำงาน ลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล : ${error}`);
      }
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#66CCFF " }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <DirectionsRunIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Run Of Runner by AunopDev DTI-SAU
            </Typography>
            <Typography variant="h6">{runnerName}</Typography>
            <Avatar
              alt="Runner"
              src={
                runnerImage === ""
                  ? Profile
                  : `http://localhost:3030/images/runner/${runnerImage}`
              }
              sx={{ width: 50, height: 50, ml: "1%", mr: "2%" }}
            ></Avatar>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "red",
                borderRadius: 10,
              }}
            >
              <Button color="inherit">Logout</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "60%",
            boxShadow: 20,
            mx: "auto",
            my: "3%",
            borderRadius: 8,
            py: 5,
            px: 5,
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", color: "#011474" }}
          >
            การวิ่งของฉัน <br />
            Running Web Application
          </Typography>

          {/* โค้ดเอาข้อมูลการวิ่งของนักวิ่งมาแสดง */}

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">วันที่วิ่ง</TableCell>
                  <TableCell align="center">รูปภาพ</TableCell>
                  <TableCell align="center">ระยะทาง</TableCell>
                  <TableCell align="center">สถานที่</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {runData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.dateRun}</TableCell>
                    <TableCell align="center">
                      <Avatar
                        alt="Runner"
                        src={
                          row.runImage === ""
                            ? Run
                            : `http://localhost:3030/images/run/${row.runImage}`
                        }
                        sx={{ width: 50, height: 50, ml: "1%", mr: "2%" }}
                      ></Avatar>
                    </TableCell>
                    <TableCell align="center">{row.distanceRun}</TableCell>
                    <TableCell align="center">{row.placeRun}</TableCell>
                    <TableCell align="center">
                      <Button component={Link} to={`/run/editrunofrunner/${row.runId}`}>แก้ไข</Button>
                      <Button onClick={() => handleDeleteRun(row.runId)}>
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/*------------------------------*/}

          <Button
            variant="contained"
            fullWidth
            component={Link}
            to="/run/addrunofrunner"
            sx={{ mt: 3, pt: "2%", pb: "2%", backgroundColor: "#011474" }}
          >
            เพิ่มข้อมูลการวิ่งของฉัน
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default RunOfRunner;
