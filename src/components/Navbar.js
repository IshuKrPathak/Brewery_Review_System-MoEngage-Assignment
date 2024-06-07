import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast";
import axios from "axios";
import { CiUser } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Image from "next/image";


const theme = createTheme({
  palette: {
    ochre: {
      main: "#4CAF50",
      contrastText: "#E53935",
    },
  },
});

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="ochre">
          <Toolbar className="flex justify-between">
            <div className="flex items-center">
              <a
                href="/homepage"
                className="text-white text-3xl font-bold tracking-wide"
              >
                Brewery Review
              </a>
            </div>
            <Button className=" font-calibri font-bold text-white" onClick={logout} >
            <CiUser size={40} width={20} height={20} className="" />
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
