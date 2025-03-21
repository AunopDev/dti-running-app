import React from "react";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import register from "./../assets/images/register.png";
import profile from "./../assets/images/profile.png";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";
import { useState } from "react";
import { API_URL } from "../config";

function RegisterRunner() {
  //สร้าง state เพื่อเก็บข้อมูลไฟล์
  const [runnerImage, setRunnerImage] = useState(null);
  const [runnerName, setRunnerName] = useState("");
  const [runnerUsername, setRunnerUsername] = useState("");
  const [runnerPassword, setRunnerPassword] = useState("");

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
      setRunnerImage(file);
    }
  };

  //ฟังก์ชั่นเรียกใช้ API เพื่อส่งข้อมูลไปบันทึก
  const handleRegisterClick = async (e) => {
    e.preventDefault();

    if (runnerName === "" || runnerUsername === "" || runnerPassword === "") {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const formData = new FormData();
    formData.append("runnerName", runnerName);
    formData.append("runnerUsername", runnerUsername);
    formData.append("runnerPassword", runnerPassword);
    if (runnerImage) {
      formData.append("runnerImage", runnerImage);
    }
    try {
      const response = await fetch(`${API_URL}/runner/`, {
        method: "POST",
        body: formData,
      });

      if (response.status == 201) {
        alert("ลงทะเบียนสำเร็จ");
        window.location.href = "/";
      } else {
        alert("ลงทะเบียนไม่สำเร็จ ลองใหม่อีกคร้ง");
      }
    } catch (error) {
      alert(`พบปัญหาในการทำงาน ลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล ${error}`);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "60%",
            boxShadow: 20,
            mx: "auto",
            my: "2%",
            borderRadius: 8,
            py: 1,
          }}
        >
          <Typography
            variant="h3"
            sx={{ textAlign: "center", color: "primary.main" }}
          >
            สมัครใช้งาน <br />
            Running Web App
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
            <Typography>ป้อนชื่อ</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mt: "1%", mb: "1%" }}
              label="Name"
              value={runnerName}
              onChange={(e) => setRunnerName(e.target.value)}
            />
            <Typography>ป้อนชื่อผู้ใช้</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mt: "1%", mb: "1%" }}
              label="Username"
              value={runnerUsername}
              onChange={(e) => setRunnerUsername(e.target.value)}
            />
            <Typography>ป้อนรหัสผ่าน</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mt: "1%", mb: "1%" }}
              type="password"
              label="Password"
              value={runnerPassword}
              onChange={(e) => setRunnerPassword(e.target.value)}
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
              src={runnerImage ? URL.createObjectURL(runnerImage) : profile}
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
                sx={{
                  pt: "3%",
                  pb: "3%",
                  backgroundColor: "primary.main",
                  color: "white",
                }}
                onClick={handleRegisterClick}
              >
                Register
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
                to="/"
              >
                Cancel
              </Button>
            </Box>
            <Typography sx={{ mt: "1%", textAlign: "center" }}>
              มีบัญชีผู้ใช้แล้ว?
              <Typography sx={{ display: "inline", ml: "2%" }}>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#ff0000" }}
                >
                  เข้าใช้งาน
                </Link>
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default RegisterRunner;
