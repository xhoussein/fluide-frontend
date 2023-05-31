export const styles = {
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: { xs: "255px", sm: "400px", md: "450px" },
    gap: "-0.5rem",
    marginTop: "100px",
    padding: "30px 50px",
    background: "#FFFFFF",
    borderRadius: "15px",
    boxShadow: "0px 3px 17px #8F8A8A80",
    margin: "5rem auto",
  },
  formHeading: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "30px",
    textAlign: "center",
  },
  inputLabel: {
    display: "flex",
    alignItems: "center",
    marginRight: "5px",
    color: "#000000",
    "& .Mui-focused": {
      color: "#000000",
    },
  },
  labelIcon: {
    marginRight: "6px",
    width: "17.19px",
    height: "12.08px",
  },
  inputField: {
    marginBottom: "30px",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ddd",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ddd",
    },
  },
  Loginbutton: {
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "10px",
    textTransform: "none",
    width: "100%",
    height: "57px",
    color: "#ffffff",
    backgroundColor: "#000000",
    "&:hover": {
      marginBottom: "30px",
      marginTop: "20px",
      marginTop: "30px",
      borderRadius: "10px",
      textTransform: "none",
      width: "100%",
      height: "57px",
      color: "#ffffff",
      backgroundColor: "#000000",
    },
  },
  Googlebutton: {
    marginBottom: "30px",
    marginTop: "20px",
    borderRadius: "10px",
    textTransform: "none",
    width: "100%",
    height: "57px",
    color: "#000000",
    backgroundColor: "#ffffff !important",
    boxShadow: "0px 3px 11px #B9B9B9",
    opacity: 1,
    "&:hover": {
      marginBottom: "30px",
      marginTop: "20px",
      borderRadius: "10px",
      textTransform: "none",
      width: "100%",
      height: "57px",
      color: "#000000",
      backgroundColor: "#ffffff",
      boxShadow: "0px 3px 11px #B9B9B9",
    },
  },
  loginUserIcon: {
    width: "23px",
    marginRight: "5px",
  },
  checkBoxDiv: {
    marginLeft: "-80px",
    display: "flex",
    alignItems: "centre",
    flexDirection: "row",
  },
  checkbox: {
    marginRight: "0px",
    "&:checked": {
      color: "#ffffff",
      backgroundColor: "#000000",
    },
  },
};
export const mobile = {
  loginContainer: {
    maxWidth: "300px",
    maxHeight: "100%",
    padding: "20px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    marginTop: "100px",
    background: "#FFFFFF",
    borderRadius: "15px",
    boxShadow: "0px 3px 17px #8F8A8A80",
  },
  checkBoxDiv: {
    marginLeft: "0px",
  },
};