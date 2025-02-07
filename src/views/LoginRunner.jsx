import React from "react";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import run from "./../assets/images/run.png";
import { Link } from "react-router-dom";

function LoginRunner() {
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
            />
            <Typography>ป้อนรหัสผ่าน</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ mt: "1%", mb: "3%" }}
              type="password"
              label="Password"
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
