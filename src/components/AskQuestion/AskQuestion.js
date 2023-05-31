import { Box } from "@mui/system";
import React, { useState } from "react";
import { style, mobile } from "./style";
import askQuestionIcon from "../../assets/icons/askQuestionIcon.svg";
import { Typography, useMediaQuery } from "@mui/material";
import SearchInput from "../searchInput/SearchInput";
import ButtonComponent from "../button/Button";
import Example from "../Examples/Example";
import { toast } from "react-toastify";
const AskQuestion = ({ descriptionData }) => {
  const [askMeQuestion, setAskMeQuestion] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const descriptionText = JSON.parse(localStorage.getItem("description"));
  const askQuestioChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const askQuestionSearchHandler = () => {
    setAskMeQuestion([]);
    const ws = new WebSocket("ws://localhost:8081");

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setAskMeQuestion((prevData) => [...prevData, receivedData]);
    };

    ws.onopen = (event) => {
      console.log("Connection opened");
      const message = {
        type: "ask-question",
        payload: {
          text: descriptionText,
          level: descriptionData.level,
          language: descriptionData.language,
          question: searchValue,
        },
      };
      ws.send(JSON.stringify(message));
    };

    ws.onerror = (event) => {
      console.log("WebSocket error:", event);
      toast.error("Something went wrong");
      ws.close();
    };

    ws.onclose = (event) => {
      console.log("Connection closed");
      ws.close();
    };
  };

  return (
    <Box sx={style.askquestionBox}>
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <img src={askQuestionIcon} alt="img" />
        <Typography variant="h2">Ask Your Question Here</Typography>
      </Box>
      <Box sx={isMobile ? mobile.searchbox : style.searchbox}>
        {" "}
        <SearchInput
          styling="style"
          onChange={askQuestioChangeHandler}
          placeholder="Enter your question"
        />
        <ButtonComponent
          sx={isMobile ? mobile.searchboxbtn : style.searchboxbtn}
          onClick={askQuestionSearchHandler}
        >
          Ask Question
        </ButtonComponent>
      </Box>
      <Box sx={{ width: "100%" }}>
        {askMeQuestion.length > 0 && (
          <Example
            exampletitle=" "
            exampleheader="Answer"
            exampleicon={askQuestionIcon}
            examplepara={askMeQuestion?.map((word, index) => {
              if (/\d/.test(word)) {
                return `${" "}${word}`;
              }
              // Check if the word is empty (space)
              if (word === "") {
                // Get the next word
                const nextWord = askMeQuestion[index + 1];
                // Check if the next word is also empty (space)
                if (nextWord === "") {
                  // Render the current word and move to a new line
                  return (
                    <React.Fragment key={index}>
                      <br />
                      <br />
                    </React.Fragment>
                  );
                }
              }

              // Render the word
              return <span key={index}>{word}</span>;
            })}
          />
        )}
      </Box>
    </Box>
  );
};

export default AskQuestion;
