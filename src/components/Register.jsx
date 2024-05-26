import { Box, Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import React, { useRef } from "react";
import EmailIcon from '@mui/icons-material/Email';
import AbcIcon from '@mui/icons-material/Abc';
import LockIcon from "@mui/icons-material/Lock";
import { NavLink,useNavigate } from "react-router-dom";
import { useUserContext } from "../store/userContext";


const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { getRegister,isCredentialsFetching } = useUserContext();
  const redirect = useNavigate();
  // const isCredentialsFetching = false;
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // console.log(userData);
    getRegister(redirect,userData);
  }

  return (
    <div className="    w-full h-[100vh] flex justify-center items-center">
      <Box className="w-[50%] max-[1050px]:w-[70%] max-[730px]:w-[90%]  border border-[#1c1d21] rounded-[0.6rem]  bg-white flex max-[583px]:flex-col  max-[583px]:items-center ">

        {/* <Box className="flex justify-center border-r-2 border-[#1c1d21] items-center w-[30%] ">
          <h1 className="text-5xl font-bold f-pt">Register</h1>
        </Box> */}
        <Box className="flex justify-center rounded-tl-[0.4rem] rounded-bl-[0.4rem] max-[583px]:rounded-tr-[0.4rem] max-[583px]:rounded-bl-none  bg-[#af7eeb] text-white items-center w-[31%] max-[583px]:w-full font-sora">
          <h1 className="text-4xl font-bold f-pt max-[583px]:py-[1.5rem] max-[536px]:text-4xl max-[536px]:py-[1rem]">Register</h1>
        </Box>

        <Box className="flex justify-center items-center w-[70%] py-[4rem] max-[583px]:py-[3rem]">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            <TextField 
              required 
              inputRef={nameRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <AbcIcon
                      style={{ color: "#af7eeb", fontSize: "2rem" }}
                    />
                  </InputAdornment>
                ),
              }}
              label="Name"
              variant="standard"
              color="secondary"
              sx={{
                "& .MuiInput-root": {
                  color: "#404144",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "1.5rem",
                },

                // Label
                "& .MuiInputLabel-standard": {
                  color: "#af7eeb",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  "&.Mui-focused": {
                    color: "#af7eeb",
                  },
                },
              }}
            />
            <TextField
              required 
              inputRef={emailRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <EmailIcon
                      style={{ color: "#af7eeb", fontSize: "2rem" }}
                    />
                  </InputAdornment>
                ),
              }}
              label="EmailID"
              variant="standard"
              color="secondary"
              sx={{
                "& .MuiInput-root": {
                  color: "#404144",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "1.5rem",
                },

                // Label
                "& .MuiInputLabel-standard": {
                  color: "#af7eeb",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  "&.Mui-focused": {
                    color: "#af7eeb",
                  },
                },
              }}
            />
            <TextField
              required 
              inputRef={passwordRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <LockIcon
                      style={{ color: "#af7eeb", fontSize: "2rem" }}
                    />
                  </InputAdornment>
                ),
              }}
              label="Password"
              type="password"
              variant="standard"
              color="secondary"
              sx={{
                "& .MuiInput-root": {
                  color: "#404144",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "1.5rem",
                },

                // Label
                "& .MuiInputLabel-standard": {
                  color: "#af7eeb",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  "&.Mui-focused": {
                    color: "#af7eeb",
                  },
                },
              }}
            />
            <Box className='text-end' >
            Already have an account? &nbsp;
              <NavLink to="/login" className="font-medium" >Login</NavLink>
            </Box>
            <Box className="flex justify-center mt-4">
            <Button
                variant="contained"
                type='submit'
                disabled={isCredentialsFetching}
                style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  fontFamily: "Playfair Display",
                  backgroundColor: "#af7eeb",
                  textTransform: "capitalize", // Capitalize the text
                  paddingLeft: "2rem", // Add padding to the left
                  paddingRight: "2rem", // Add padding to the right
                  borderRadius:"0.9rem",
                }}
                className="px-4"
              >
                {
                  !isCredentialsFetching?("Submit"):(<CircularProgress sx={{color:'#8e5772'}} />)
                }
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
