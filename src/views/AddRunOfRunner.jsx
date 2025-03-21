import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  Toolbar,
  AppBar,
} from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { Link } from "react-router-dom";
import Profile from "./../assets/images/profile.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";
import register from "./../assets/images/register.png";
import profile from "./../assets/images/profile.png";
import { API_URL } from "../config";

function AddRunOfRunner() {
  const [runnerName, setRunnerName] = useState("");
  const [runnerImage, setRunnerImage] = useState("");
  const [runnerId, serRunnerId] = useState("");

  const [dateRun, setDateRun] = useState("");
  const [distanceRun, setDistanceRun] = useState("");
  const [placeRun, setPlaceRun] = useState("");
  const [runImage, setRunImage] = useState(null);

  useEffect(() => {
    //อ่านข้อมูลจาก localStorage
    const runner = JSON.parse(localStorage.getItem("runner"));

    //เอาข้อมูลที่อ่านจาก localStorage มาเก็บไว้ใน state
    setRunnerName(runner.runnerName);
    setRunnerImage(runner.runnerImage);
    serRunnerId(runner.runnerId);
  }, []);

  //กำหนด style ให้กับ input file
  const SelectFile = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  //ฟังก์ชันเมื่อมีการเลือกไฟล์
  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRunImage(file);
    }
  };

  // ฟังก์ชั่นบันทึกข้อมูลการวิ่ง
  const handleSaveRunClick = async (e) => {
    e.preventDefault();

    // validate ข้อมูล
    if (dateRun === "" || distanceRun === "" || placeRun === "") {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // ส่งข้อมูลไปบันทึก
    // เอาข้อมูลไปเก็บไว้ใน FormData
    const formData = new FormData();
    formData.append("runnerId", runnerId);
    formData.append("dateRun", dateRun);
    formData.append("distanceRun", distanceRun);
    formData.append("placeRun", placeRun);
    if (runImage) {
      formData.append("runImage", runImage);
    }
    // ส่งข้อมูลไปผ่าน API ที่กำหนดไว้ที่ Back-End
    try {
      const response = await fetch(`${API_URL}/run/`, {
        method: "POST",
        body: formData,
      });

      // เช็คสถานะการส่งไป
      if (response.status == 201) {
        alert("บันทึกข้อมูลการวิ่งสำเร็จ");
        window.location.href = "/run/runofrunner";
      } else {
        alert("บันทึกข้อมูลการวิ่งไม่สำเร็จ ลองใหม่อีกคร้ง");
      }
    } catch (error) {
      alert(`พบปัญหาในการทำงาน ลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล : ${error}`);
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
                  : `${API_URL}/images/runner/${runnerImage}`
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
            เพิ่มข้อมูลการวื่ง <br />
            Running Web Application
          </Typography>

          <Avatar
            alt="Running"
            src={register}
            variant="rounded"
            sx={{
              mx: "auto",
              mt: "1.5%",
              width: "15%",
              height: "15%",
            }}
          />
          <Box sx={{ width: "60%", mx: "auto", mt: "2%" }}>
            <Typography>ป้อนวันที่วิ่ง</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mt: "1%", mb: "1%" }}
              label="Date Run"
              value={dateRun}
              onChange={(e) => setDateRun(e.target.value)}
            />
            <Typography>ป้อนระยะทางที่วิ่ง</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mt: "1%", mb: "1%" }}
              label="Distance Run"
              value={distanceRun}
              onChange={(e) => setDistanceRun(e.target.value)}
            />
            <Typography>สถานที่วิ่ง</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mt: "1%", mb: "1%" }}
              label="Place Run"
              value={placeRun}
              onChange={(e) => setPlaceRun(e.target.value)}
            />
            {/* -------------------------------- */}
            <Avatar
              alt="Runner"
              variant="rounded"
              sx={{
                mx: "auto",
                mb: "3%",
                mt: "2%",
                width: 120,
                height: 120,
                boxShadow: 20,
              }}
              src={runImage ? URL.createObjectURL(runImage) : profile}
            ></Avatar>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: "2%",
                py: "0.5%",
              }}
            >
              <Button
                sx={{ py: "2%" }}
                variant="contained"
                component="label"
                color="success"
                startIcon={<CloudUploadIcon />}
              >
                Select file upload
                <SelectFile
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                />
              </Button>
            </Box>

            {/* -------------------------------- */}
            <Box sx={{ display: "flex", gap: "2%", mt: "1%", mb: "5%" }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSaveRunClick}
                sx={{
                  pt: "3%",
                  pb: "3%",
                  backgroundColor: "primary.main",
                  color: "white",
                }}
              >
                บันทึกข้อมูลการวิ่ง
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  pt: "3%",
                  pb: "3%",
                  borderColor: "primary.main",
                  color: "primary.main",
                }}
                component={Link}
                to="/run/runofrunner"
              >
                Cancel
              </Button>
            </Box>
            <Typography sx={{ ml: "2%", textAlign: "center" }}>
              <Link
                to="/run/runofrunner"
                style={{ textDecoration: "none", color: "#ff0000" }}
              >
                กลับไปหน้าการวิ่งของฉัน
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AddRunOfRunner;
