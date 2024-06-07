"use client";

import TextField from "@mui/material/TextField";
import { ButtonBase, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Homepage() {
  const router = useRouter();
  const types = [
    "micro",
    "nano",
    "regional",
    "brewpub",
    "large",
    "planning",
    "bar",
    "contract",
    "propietor",
    "closed",
  ];

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [breweryType, setBreweryType] = useState("");
  const [results, setResults] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApiCall = () => {
    const params = {};

    if (name) {
      params.by_name = name;
    }

    if (city) {
      params.by_city = city;
    }

    if (breweryType) {
      params.by_type = breweryType;
    }
    axios
      .get(`https://api.openbrewerydb.org/v1/breweries`, {
        params,
      })
      .then((response) => {
        setResults(response.data);
        console.group(results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-auto bg-yellow-50 min-h-screen">
        <div className="flex flex-row justify-start items-start w-full px-5 py-5">
          <div className="flex flex-col justify-start items-start w-1/6">
            <div className="font-calibri text-lg text-[#363dff] uppercase font-bold mb-6">
              Enter the Brewery details</div>
          <TextField
            variant="outlined"
            placeholder="Enter Name"
            label="Enter name of the Brewery"
            value={name}
            className="w-full mb-2 px-1"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter City"
            label="Enter City"
            value={city}
            className="w-full mb-4 px-1"
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            select
            label="Brewery Type"
            value={breweryType}
            onChange={(e) => setBreweryType(e.target.value)}
            className="w-full mb-4 px-1"
          >
            {types.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            size="large"
            onClick={handleApiCall}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-red-600 w-full"
          >
            Search
          </Button>
        </div>
  <div className="flex flex-col justify-center items-right w-4/7">
    {results.length > 0 ? (
      <div className="flex flex-col items-center justify-center py-10">
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, boxShadow: 4, maxWidth: '90%' }}
        >
          <Table size="small">
            <TableHead sx={{ background: "#4CAF50" }}>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Address
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    City
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    State
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Phone
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Website
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {row.address_1}
                      {row.address_2 && ` ${row.address_2}`}
                      {row.address_3 && ` ${row.address_3}`}
                    </TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      <a
                        href={row.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.website_url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Link key={row.id} href={`/breweryinfo/${row.id}`}>
                        <Button type="submit" 
                        variant="contained" 
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-red-600"
                        style={{ fontFamily: "Calibri" }}>
                          View info
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={results.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center"
        style={
          {
            marginLeft: '400px',
            marginTop: '200px'
          }
        }
      >
      <Typography >Search by name, city, type for breweries</Typography></div>
    )}
  </div>
</div>

      </div>
    </>
  );
}
