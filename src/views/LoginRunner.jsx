import React from "react";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import run from "./../assets/images/run.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginRunner() {
  const [runnerUsername, setRunnerUsername] = useState("");
  const [runnerPassword, setRunnerPassword] = useState("");

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (runnerUsername === "" || runnerPassword === "") {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const formData = new FormData();
    formData.append("runnerUsername", runnerUsername);
    formData.append("runnerPassword", runnerPassword);

    try {
      const response = await fetch(
        `http://localhost:3030/runner/${runnerUsername}/${runnerPassword}`,
        {
          method: "GET",
        }
      );

      if (response.status == 200) {
        // alert("เข้าใช้งานสำเร็จ");
        // ก่อนที่จะเปิดไปเราจะเอาข้อมูลของผู้ใช้เก็บใน localStorage
        const responeData = await response.json();
        localStorage.setItem("runner", JSON.stringify(responeData["data"]));

        window.location.href = "/run/runofrunner";
      } else if (response.status == 404) {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      } else {
        alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล");
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
            mt: "3%",
            borderRadius: 8,
            py: "1%",
          }}
        >
          <Typography
            variant="h3"
            sx={{ textAlign: "center", color: "primary.main" }}
          >
            เข้าใช้งาน <br />
            Running Web App
          </Typography>
          <Avatar
            alt="Running"
            src={run}
            variant="rounded"
            sx={{
              mx: "auto",
              mt: "1.5%",
              width: "15%",
              height: "15%",
            }}
          />
          <Box sx={{ width: "60%", mx: "auto", mt: "2%" }}>
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
              sx={{ mt: "1%", mb: "3%" }}
              type="password"
              label="Password"
              value={runnerPassword}
              onChange={(e) => setRunnerPassword(e.target.value)}
            />{" "}
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: "1%",
                mb: "5%",
                pt: "3%",
                pb: "3%",
                backgroundColor: "primary.main",
                color: "white",
              }}
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <Typography sx={{ mt: "1%", textAlign: "center" }}>
              ยังไม่มีบัญชีผู้ใช้?
              <Typography sx={{ display: "inline", ml: "2%" }}>
                <Link
                  to="/runner/registerrunner"
                  style={{ textDecoration: "none", color: "#ff0000" }}
                >
                  ลงทะเบียน
                </Link>
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LoginRunner;
