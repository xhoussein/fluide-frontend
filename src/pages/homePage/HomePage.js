import {
  Box,
  Typography,
  Container,
  FormHelperText,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/button/Button";
import Dropdown from "../../components/dropdown/Dropdown";
import SearchInput from "../../components/searchInput/SearchInput";
import Modules from "./modules/Modules";
import { style } from "./style";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchModuleData,
  fetchLessonModuleData,
} from "../../redux/actions/modulesData/moduleDataAction";

import { searchCounterIncrement } from "../../redux/actions/searchCounter/searchCounterAction";
import Cookies from "js-cookie";
import { viewLessonData } from "../../redux/actions/viewLessonAction/viewLessonAction";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { cleanUpDataAction } from "../../redux/actions/cleanUpData/cleanUpData";
import { routeDataAction } from "../../redux/actions/routesData/routesDataAction";


const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.persistData?.moduleData?.data);
  const searchData = useSelector(
    (state) => state?.persistData?.moduleData?.searchData
  );
  const userData = useSelector(
    (state) => state.persistData.loginData.isLoggedIn
  );
  const loading = useSelector((state) => state.loadingReducer.isLoading);
  

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
      dispatch(cleanUpDataAction());
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [searchCount, setSearchCount] = useState(false);

  const [options, setOptions] = useState({
    levels: "",
    languages: "",
  });

  const generateHandler = (e) => {
    const searchCount = Cookies.get("searchCount");
    dispatch(routeDataAction(""));

    const payload = {
      topic: search,
      level: options.levels,
      language: options.languages,
    };
    if (!search || !options.levels || !options.languages) {
      setError("Please enter all inputs.");
    } else {
      if (userData) {
        dispatch(fetchModuleData(payload));
      } else {
        dispatch(searchCounterIncrement());
        setError("");
        if (searchCount > 2) {
          setSearchCount(true);
        } else {
          dispatch(fetchModuleData(payload));
        }
      }
    }
  };

  const viewLessonButtonHandler = (data, index) => {
    
    dispatch(viewLessonData(data))
    navigate(`/lesson/${index}/${data.toLowerCase()}`);
    const payload = {
      module_name: data,
      level: searchData.level,
      language: searchData.language,
      topic:searchData.topic
    };
    dispatch(fetchLessonModuleData(payload));
  };

  const dropdownOnChnageHandler = (e) => {
    const { name, value } = e.target;
    setOptions({
      ...options,
      [name]: value,
    });
  };

  const level = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "mandarin", label: "Mandarin" },
    { value: "hindi", label: "Hindi" },
    { value: "french", label: "French" },
    { value: "arabic", label: "Arabic" },
    { value: "bengali", label: "Bengali" },
    { value: "portuguese", label: "Portuguese" },
    { value: "german", label: "German" },
    { value: "japanese", label: "Japanese" },
  ];

  return (
    <Container>
      {loading && <LoadingSpinner message={`Generating modules for: ${search.charAt(0).toUpperCase() + search.slice(1)}`}/>}
      <Box sx={style.root}>
        <Typography variant="h1" sx={{ lineHeight: "40px" }}>
          fluide
        </Typography>
        <Typography variant="h3" sx={style.gradientText}>
          Accelerate your learning with adaptive education
        </Typography>
        <Box sx={style.subContainer}>
          <SearchInput
            error={error}
            onChange={searchChangeHandler}
            placeholder="Enter a topic, such as probability, psychology, finance, or data analytics..."
          />
          <Dropdown
            defaultOption="Select Level"
            options={level}
            onChange={dropdownOnChnageHandler}
            selectedValue={options.levels}
            name="levels"
          />
          <Dropdown
            defaultOption="Select Languages"
            options={languages}
            onChange={dropdownOnChnageHandler}
            name="languages"
            selectedValue={options.languages}
          />
        </Box>

        {error && (
          <FormHelperText
            sx={{
              color: "red",
              margin: {
                xs: "-1rem 1rem",
                sm: "0 0 0 14rem",
                md: "-1.5rem 1rem",
              },
            }}
          >
            <Typography variant="h5">{error}</Typography>
          </FormHelperText>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <ButtonComponent onClick={generateHandler}>
            Generate Modules
          </ButtonComponent>
          <Typography variant="h6" sx={{ fontStyle: "italic" }}>
            Hint: Your topic can be as broad or as specific as you want.
          </Typography>
          {searchCount && (
            <Paper elevation={0} sx={{ padding: "1rem" }}>
              <Typography variant="h4">
                Please{" "}
                <span
                  type="button"
                  onClick={() => navigate("/login")}
                  style={{
                    color: "#6C8EA5",
                    cursor: "pointer",
                  }}
                >
                  Login{" "}
                </span>
                to continue. You have exceeded the maximum number of attempts.
              </Typography>
            </Paper>
          )}
        </Box>
        <Box sx={{ marginTop: "2rem" }}>
          {data?.length > 0 && (
            <Modules data={data} onClick={viewLessonButtonHandler} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
