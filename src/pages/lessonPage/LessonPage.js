import React, { useEffect } from "react";
import LeassonCard from "./lessonCard.js/LessonCard";
import lessonIcon from "../../assets/icons/module.svg";
import { Box, Container } from "@mui/system";
import ScrollableContainer from "../../components/ScrollableContainer/ScrollableContainer";
import { IconButtonComponent } from "../../components/button/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LessonModules from "./lessonModules/LessonModules";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Typography } from "@mui/material";
import { useState } from "react";
import DescriptionCard from "../../components/DescriptionCard/DescriptionCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLessonModuleData,
  saveLessonData,
} from "../../redux/actions/modulesData/moduleDataAction";
import Scrollable from "../../components/scrollable/Scrollable";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { viewLessonData } from "../../redux/actions/viewLessonAction/viewLessonAction";

import { cleanUpDataAction } from "../../redux/actions/cleanUpData/cleanUpData";
import { routeDataAction } from "../../redux/actions/routesData/routesDataAction";
import QuizContainer from "../../components/quiz/QuestionsContainer";

const LessonPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id, module } = useParams();
  const location = useLocation();


  const data = useSelector((state) => state?.persistData?.moduleData?.data);
  const searchData = useSelector(
    (state) => state?.persistData?.moduleData?.searchData
  );
  const lessonData = useSelector(
    (state) => state?.persistData?.lessonModuleReducer?.lessonData
  );
  const loadingMessage = useSelector(
    (state) => state.viewLessonReducer.viewLesson
  );

   const quizData = useSelector((state) => state.nonPersistData.quizData);

  const isLoading = useSelector((state) => state.loadingReducer.isLoading);
  const [isDescription, setIsDescription] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [specificLessonTitle, setSpecificLessonTitle] = useState("");
  const [lessonIndex, setLessonIndex] = useState();
  const [nextLessonData, setNextLessonData] = useState();
  const loading = useSelector((state) => state.loadingReducer.isLoading);
  const currentPage = useSelector(
    (state) => state.currentPageReducer.currentPage
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [prevLocation, setPrevLocation] = useState("");
  const [descriptionData, setDescriptionData] = useState({
    moduleName: "",
    level: "",
    language: "",
    lessonName: "",
    activityName: "",
  });

  const handleBackClick = () => {
    if (currentPage === "lessons") {
      navigate("/");
    } else {
      setIsDescription(false);
      dispatch(routeDataAction("lessons"));
    }
  };

  const capitalizedModuleName =
    module.charAt(0).toUpperCase() + module.slice(1);
  const sliderCardSubmitHandler = (data, index) => {
    dispatch(routeDataAction("lessons"));
    dispatch(viewLessonData(data));
    setIsDescription(false);
    setLessonTitle("");
    navigate(`/lesson/${index}/${data.toLowerCase()}`);
    const payload = {
      module_name: data,
      level: searchData.level,
      language: searchData.language,
      topic: searchData.topic,
    };
    dispatch(fetchLessonModuleData(payload));
  };
 

  useEffect(() => {
    window.onpopstate=handleLocationChange
    return () => {
     window.onpopstate=null
    };
  }, []);


    const handleLocationChange = () => {
      if (currentPage === "lessons") {
        navigate("/");
      }
      dispatch(routeDataAction("lessons"));
      setIsDescription(false);
    };

  useEffect(() => {
    dispatch(routeDataAction("lessons"));
  }, [dispatch]);

  const viewLessonHandlerClick = (data, indexId) => {
    console.log("🚀 ~ file: LessonPage.js:122 ~ viewLessonHandlerClick ~ data:", data)
    dispatch(routeDataAction("description"));
    searchParams.set("page", "description");
    setSearchParams(searchParams);
    localStorage.removeItem("nextLessonData");
    dispatch(viewLessonData(data.lesson_title));
    const lessonTitle = `Lesson ${indexId + 1} : ${data.lesson_title}`;
    setDescriptionData({
      module_name: capitalizedModuleName,
      level: searchData.level,
      language: searchData.language,
      lesson_name: data.lesson_title,
      activity_name:data.chapter_titles[0],
    });
    setIsDescription(true);
    setLessonIndex(indexId);
    setLessonTitle(lessonTitle);
    setSpecificLessonTitle(data.chapter_titles[0]);
  };

  const listClickHandler = (value, lessonData, index) => {
    dispatch(routeDataAction("description"));
    searchParams.set("page", "description");
    setSearchParams(searchParams);
    localStorage.removeItem("nextLessonData");
    dispatch(viewLessonData(value));
    const lessonTitle = `Lesson ${index + 1} : ${lessonData.lesson_title}`;
    setDescriptionData({
      module_name: capitalizedModuleName,
      level: searchData.level,
      language: searchData.language,
      lesson_name: lessonData.lesson_title,
      activity_name: value,
    });
    setIsDescription(true);
    setLessonTitle(lessonTitle);
    setLessonIndex(index);
    setSpecificLessonTitle(value);
  };

  useEffect(() => {
    const updateData = {
      ...descriptionData,
    };
    dispatch(saveLessonData(updateData));
  }, [specificLessonTitle, dispatch, descriptionData]);

  return (
    <Container sx={{ marginTop: "2rem" }}>
      {isLoading && (
        <LoadingSpinner
          message={`Generating the following module: ${loadingMessage}`}
        />
      )}
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Box sx={{ display: "flex", padding: "0 1rem" }}>
          <IconButtonComponent onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButtonComponent>
        </Box>
        <Scrollable
          data={data}
          id={id}
          sliderCardSubmitHandler={sliderCardSubmitHandler}
        />
        {!loading && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "0 0 2rem 1rem",
              }}
            >
              <Typography variant="h2">
                Module {id} : {capitalizedModuleName}
              </Typography>
              {lessonTitle ? (
                <Typography variant="h4">
                  {nextLessonData?.nextLessonTitle
                    ? `Lesson ${nextLessonData.index + 1} : ${
                        nextLessonData.nextLessonTitle
                      }`
                    : lessonTitle}
                </Typography>
              ) : (
                <Typography variant="h4">
                  Click on the lesson to see it Content
                </Typography>
              )}
            </Box>
            <Box>
              {!isDescription && (
                <LessonModules
                  onClick={viewLessonHandlerClick}
                  handlerClick={listClickHandler}
                />
              )}
              {isDescription && (
                <DescriptionCard
                  descriptionData={descriptionData}
                  capitalizedModuleName={capitalizedModuleName}
                  lessonTitle={specificLessonTitle}
                  lessonIndex={lessonIndex}
                  nextLessonTitle={setNextLessonData}
                />
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default LessonPage;
